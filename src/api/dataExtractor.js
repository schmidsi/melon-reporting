import * as R from 'ramda';
import BigNumber from 'bignumber.js';
import {
  ensure,
  getAddress,
  getConfig,
  getFundContract,
  getFundRecentTrades,
  getFundInformations,
  getHoldingsAndPrices,
  getParityProvider,
  getSymbol,
  performCalculations,
  toReadable,
  tracks,
} from '@melonproject/melon.js';

import Web3 from 'web3';

import * as addressBook from '@melonproject/smart-contracts/addressBook.json';
import FundAbi from '@melonproject/smart-contracts/out/version/Fund.abi.json';
import Erc20Abi from '@melonproject/smart-contracts/out/ERC20Interface.abi.json';
import OasisDexAbi from '@melonproject/smart-contracts/out/exchange/adapter/MatchingMarket.abi.json';
import ZeroExAbi from '@melonproject/smart-contracts/out/exchange/thirdparty/0x/Exchange.abi.json';

import getDebug from '~/utils/getDebug';

import fundSimulator from '~/api/fundSimulator';

import priceHistoryReaderAbi from '~/contracts/abi/PriceHistoryReader.json';
import getAuditsFromFund from './getAuditsFromFund';
import { toTimestamp } from '~/utils/timestamp';

const debug = getDebug(__filename);

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.JSON_RPC_ENDPOINT),
);

const priceHistoryReaderAddress = '0xbff03059206eba4427fba207c64ddfb5fa3b480b';

const AVERAGE_BLOCKTIME = 7; // 7.52

const zeroExLogFillAbi = ZeroExAbi.find(
  e => e.name === 'LogFill' && e.type === 'event',
);

const getAddressBookForTrack = (track, addressBook) =>
  R.cond([
    [R.equals(tracks.LIVE), (_, addressBook) => addressBook.live],
    [R.equals(tracks.KOVAN_DEMO), (_, addressBook) => addressBook.kovan],
    [
      R.equals(tracks.KOVAN_COMPETITION),
      (_, addressBook) => addressBook.kovanCompetition,
    ],
  ])(track, addressBook);

// TODO: Remove kovan from addressBook
const getExchangeName = ofAddress =>
  (Object.entries(getAddressBookForTrack(process.env.TRACK, addressBook)).find(
    ([, address]) => address.toLowerCase() === ofAddress.toLowerCase(),
  ) || ['n/a'])[0];

const onlyInTimespan = (timestamp, timeSpanStart, timeSpanEnd) =>
  timestamp >= timeSpanStart && timestamp <= timeSpanEnd;

const parseAddress = hexString => `0x${hexString.slice(-40)}`;

const getSymbolOrFund = (config, address) => {
  try {
    return getSymbol(config, address);
  } catch (e) {
    return 'MLNF';
  }
};

const getPersonFromAddress = address => ({
  address,
  // do ens lookup here (future work)
  name: 'unknown',
});

const getLegalEntity = () => ['unknown']; // future work when legal entity is available

const parseTransferLog = config => log => {
  const tokens = new BigNumber(log.data);

  const from = parseAddress(log.topics[1]);
  const to = parseAddress(log.topics[2]);

  const symbol = getSymbolOrFund(config, log.address);
  const amount = toReadable(
    config,
    tokens,
    symbol === 'MLNF' ? config.quoteAssetSymbol : symbol,
  ).toString();

  return {
    from,
    to,
    symbol,
    amount,
    blockNumber: log.blockNumber,
  };
};

const getRelevantDates = (timeSpanStart, timeSpanEnd) => {
  const relevantDates = [];
  const d = new Date(timeSpanStart * 1000);
  let timestamp =
    new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0) /
    1000;
  while (timestamp <= timeSpanEnd) {
    const date = new Date(timestamp * 1000);
    relevantDates.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    timestamp += 86400;
  }
  // exclude current day
  // return R.take(relevantDates.length - 1, relevantDates);

  // with current day
  return relevantDates;
};

const extractPrices = (address, priceHistory, config) =>
  priceHistory.map(priceEntry => {
    const tokenAddresses = priceEntry.tokenAddresses.map(a => a.toLowerCase());
    const symbol = getSymbol(config, address);
    const index = R.findIndex(R.equals(address.toLowerCase()))(tokenAddresses);
    // return index === -1 ? 0 : priceEntry.averagedPrices[index]; // for average prices
    return toReadable(config, priceEntry.prices[index], symbol).toString(); // for first prices
  });

const getTokenByAddress = (holdings, address) => {
  const tokens = holdings.map(holding => ({
    symbol: holding.token.symbol,
    address: holding.token.address.toLowerCase(),
  }));
  const token = R.find(R.propEq('address', address.toLowerCase()))(tokens);
  return token;
};

const getTokenBySymbol = (holdings, symbol) => {
  const tokens = holdings.map(holding => ({
    symbol: holding.token.symbol,
    address: holding.token.address,
  }));
  return R.find(R.propEq('symbol', symbol))(tokens);
};

const getExchangeByName = (exchanges, name) =>
  R.find(R.propEq('name', name))(exchanges);

const getStrategy = () => 'unknown'; // future work: get strategy when available

const dataExtractor = async (fundAddress, _timeSpanStart, _timeSpanEnd) => {
  const provider = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  const environment = {
    ...provider,
    track: process.env.TRACK,
  };

  debug('Extractor start', { environment });

  const timeSpanStart = parseInt(_timeSpanStart, 10);
  const timeSpanEnd = parseInt(_timeSpanEnd, 10);

  ensure(
    timeSpanStart < timeSpanEnd,
    'timeSpanStart needs to be bigger than timeSpanEnd',
    {
      timeSpanEnd,
      timeSpanStart,
    },
  );

  const informations = await getFundInformations(environment, {
    fundAddress,
  });

  const config = await getConfig(environment);

  debug('Config & fund informations', { informations, config });

  const fundContract = await getFundContract(environment, fundAddress);

  const priceHistoryReader = new web3.eth.Contract(
    priceHistoryReaderAbi,
    priceHistoryReaderAddress,
  );

  const currentBlock = await web3.eth.getBlockNumber();

  debug('Current block', currentBlock);

  const zeroExLogFillEventSignature = web3.eth.abi.encodeEventSignature(
    zeroExLogFillAbi,
  );

  const web3jsFundContract = new web3.eth.Contract(FundAbi, fundAddress);

  const fundAgeInSeconds = Math.floor(
    (new Date() - informations.inception) / 1000,
  );

  const inceptionBlockApprox = Math.floor(
    currentBlock - fundAgeInSeconds / AVERAGE_BLOCKTIME,
  );

  const fundInceptionTimestamp = informations.inception.getTime() / 1000;
  const timestampOfNow = new Date().getTime() / 1000;
  const relevantDates = getRelevantDates(
    fundInceptionTimestamp,
    timestampOfNow,
  );

  const calculations = await performCalculations(environment, {
    fundAddress,
  });

  debug('Fund calculations', calculations);

  const [exchanges] = await fundContract.instance.getExchangeInfo.call();

  const ownCalculations = await fundContract.instance.performCalculations.call();
  const managementFee = ownCalculations[1].div(10 ** 18).toString();
  const performanceFee = ownCalculations[2].div(10 ** 18).toString();

  const strategy = getStrategy();

  const meta = {
    fundName: informations.name,
    fundAddress: informations.fundAddress,
    timeSpanStart,
    timeSpanEnd,
    manager: getPersonFromAddress(informations.owner),
    inception: Math.round(new Date(informations.inception).getTime() / 1000),
    quoteToken: {
      symbol: config.quoteAssetSymbol,
      address: getAddress(config, config.quoteAssetSymbol),
    },
    exchanges: exchanges.map(entry => ({
      /* eslint-disable no-underscore-dangle */
      address: entry._value,
      name: getExchangeName(entry._value),
      /* eslint-enable */
    })),
    totalSupply: calculations.totalSupply.toString(),
    legalEntity: getLegalEntity(),
    managementFee,
    performanceFee,
    strategy,
  };

  debug('Meta', meta);

  // HOLDINGS AND PRICES

  // this returns the holdings of 'now', but we would start by inception
  // we erase the holdings further below
  const initialHoldings = (await getHoldingsAndPrices(environment, {
    fundAddress,
  })).map(holding => ({
    symbol: holding.name,
    balance: '0.0',
  }));

  debug('Initial holdings', initialHoldings);

  const priceHistoryTasks = relevantDates.map(date => () =>
    priceHistoryReader.methods
      // .getAveragedPricesForDay(date.year, date.month, date.day)
      .getFirstAvailablePricesForDay(date.year, date.month, date.day)
      .call({})
      .then(res => res)
      .catch(err => console.warn(err) || null),
  );

  const priceHistory = await priceHistoryTasks.reduce(
    async (carryPromise, currentTask) => {
      const carry = await carryPromise;
      const currentResult = await currentTask();
      // if current result is null (i.e. there was an error), we just repeat the last
      return [...carry, currentResult || R.last(carry)];
    },
    new Promise(resolve => resolve([])),
  );

  debug('Price history', priceHistory);

  const holdingsWithoutPriceHistory = initialHoldings.map(holding => ({
    token: {
      symbol: holding.symbol,
      address: getAddress(config, holding.symbol),
    },
    quantity: holding.balance.toString(),
    priceHistory: [],
  }));

  const holdings = holdingsWithoutPriceHistory.map(holding => ({
    ...holding,
    priceHistory: extractPrices(holding.token.address, priceHistory, config),
  }));

  debug('Holdings', holdings);

  // TRADES

  const oasisDexTrades = await getFundRecentTrades(environment, {
    fundAddress,
    inlastXdays: relevantDates.length,
  });

  debug('Oasis Dex trades', oasisDexTrades);

  // TODO are partial orders missing?
  // TODO problem is probably that maker is always the 0x contract
  // TODO maybe get trades with OrderUpdated event of Fund.sol
  // TODO maybe it is the manager
  const zeroExTrades = (await web3.eth.getPastLogs({
    fromBlock: web3.utils.numberToHex(inceptionBlockApprox),
    toBlock: web3.utils.numberToHex(currentBlock),
    topics: [zeroExLogFillEventSignature],
  }))
    .map(log => {
      const logFill = web3.eth.abi.decodeLog(
        zeroExLogFillAbi.inputs,
        log.data,
        log.topics,
      );
      logFill.blockNumber = log.blockNumber;
      logFill.transactionHash = log.transactionHash;
      return logFill;
    })
    .filter(
      logFill =>
        logFill.taker.toLowerCase() === fundAddress.toLowerCase() ||
        logFill.maker.toLowerCase() === fundAddress.toLowerCase(),
    );

  debug('0x trades', zeroExTrades);

  const allAudits = await getAuditsFromFund(environment, { fundAddress });

  debug('Audits', allAudits);

  // filter audits on timeSpan for determinism
  const audits = allAudits.filter(
    audit => audit.timestamp <= timeSpanEnd && audit.timestamp >= timeSpanStart,
  );

  const lastRequestId = await fundContract.instance.getLastRequestId.call();

  const requestPromises = R.range(0, lastRequestId.toNumber() + 1).map(
    i => () =>
      fundContract.instance.requests
        .call({}, [i])
        .then(
          ([
            participant,
            status,
            requestAsset,
            shareQuantity,
            giveQuantity,
            receiveQuantity,
            timestamp,
            atUpdateId,
          ]) => ({
            participant,
            status,
            requestAsset,
            shareQuantity,
            giveQuantity,
            receiveQuantity,
            timestamp,
            atUpdateId,
          }),
        ),
  );

  const requests = await Promise.all(requestPromises.map(p => p()));

  debug('Participation requests', requests);

  const invests = requests
    .filter(r => r.status.eq(2))
    .filter(r => onlyInTimespan(r.timestamp, timeSpanStart, timeSpanEnd))
    .map(
      ({
        requestAsset,
        participant,
        shareQuantity,
        giveQuantity,
        timestamp,
      }) => ({
        investor: participant,
        token: {
          symbol: getSymbol(config, requestAsset),
          address: requestAsset,
        },
        type: 'invest',
        amount: toReadable(
          config,
          giveQuantity,
          getSymbol(config, requestAsset),
        ),
        shares: toReadable(
          config,
          shareQuantity,
          getSymbol(config, requestAsset),
        ),
        timestamp,
      }),
    );

  const investors = invests.map(invest =>
    getPersonFromAddress(invest.investor),
  );

  debug('Filtered participation requests for invests', { invests, investors });

  const allRedeems = await web3jsFundContract.getPastEvents('Redeemed', {
    fromBlock: inceptionBlockApprox,
    toBlock: 'latest',
  });

  const redeems = allRedeems
    // we only need the redeem events that were emitted in the provided report timespan
    .filter(r =>
      onlyInTimespan(r.returnValues.atTimestamp, timeSpanStart, timeSpanEnd),
    )
    .map(r => ({
      investor: r.returnValues.ofParticipant,
      type: 'redeem',
      shares: toReadable(
        config,
        r.returnValues.shareQuantity,
        config.quoteAssetSymbol,
      ),
      timestamp: r.returnValues.atTimestamp,
    }));

  debug('Redeems', redeems);

  // PREPARE SIMULATOR ACTIONS

  const investActions = invests.map(invest => ({
    type: 'INVEST',
    value: invest.amount.toString(),
    investor: invest.investor,
    timestamp: parseInt(invest.timestamp.toString(), 10),
  }));

  const redeemActions = redeems.map(redeem => ({
    type: 'REDEEM',
    shares: redeem.shares.toString(),
    investor: redeem.investor,
    timestamp: parseInt(redeem.timestamp, 10),
  }));

  const zeroExTradeActionTasks = zeroExTrades.map(trade => async () => ({
    type: 'TRADE',
    sellToken: getTokenByAddress(holdings, trade.takerToken),
    sellHowMuch: toReadable(
      config,
      trade.filledTakerTokenAmount,
      getSymbol(config, trade.takerToken),
    ).toString(),
    buyToken: getTokenByAddress(holdings, trade.makerToken),
    buyHowMuch: toReadable(
      config,
      trade.filledMakerTokenAmount,
      getSymbol(config, trade.makerToken),
    ).toString(),
    timestamp: (await web3.eth.getBlock(trade.blockNumber)).timestamp,
    exchange: getExchangeByName(meta.exchanges, 'ZeroExExchange'),
    transaction: trade.transactionHash,
  }));

  const zeroExTradeActions = await Promise.all(
    zeroExTradeActionTasks.map(p => p()),
  );

  const oasisDexTradeActions = oasisDexTrades.map(trade => ({
    type: 'TRADE',
    buyToken: getTokenBySymbol(holdings, trade.buyToken),
    buyHowMuch: toReadable(
      config,
      trade.buyQuantity,
      trade.buyToken,
    ).toString(),
    sellToken: getTokenBySymbol(holdings, trade.sellToken),
    sellHowMuch: toReadable(
      config,
      trade.sellQuantity,
      trade.sellToken,
    ).toString(),
    timestamp: trade.timestamp.getTime() / 1000,
    exchange: getExchangeByName(meta.exchanges, 'MatchingMarket'),
    transaction: trade.transactionHash,
  }));

  // SIMULATOR

  const unorderedSimulatorActions = investActions
    .concat(redeemActions)
    .concat(zeroExTradeActions)
    .concat(oasisDexTradeActions);

  const orderedSimulatorActions = R.sortBy(action => action.timestamp)(
    unorderedSimulatorActions,
  );

  debug('Simulator actions', orderedSimulatorActions);

  const initialData = {
    meta,
    trades: [],
    participations: {
      investors,
      list: [],
    },
    holdings,
    audits,
  };

  const fund = fundSimulator(initialData);

  orderedSimulatorActions.forEach(action => fund.dispatch(action));

  fund.dispatch({
    type: 'CALCULATE',
    timestamp: toTimestamp(new Date()),
  });

  const finalState = fund.getState();

  debug('Final Fund State', finalState);

  return finalState;
};

export default dataExtractor;
