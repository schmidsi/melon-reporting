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
} from '@melonproject/melon.js';

import Web3 from 'web3';

import * as addressBook from '@melonproject/smart-contracts/addressBook.json';
import VersionAbi from '@melonproject/smart-contracts/out/VersionInterface.abi.json';
import FundAbi from '@melonproject/smart-contracts/out/version/Fund.abi.json';
import Erc20Abi from '@melonproject/smart-contracts/out/ERC20Interface.abi.json';
import ZeroExAbi from '@melonproject/smart-contracts/out/exchange/thirdparty/0x/Exchange.abi.json';

import getDebug from '~/utils/getDebug';

import fundSimulator from '~/api/fundSimulator';

import priceHistoryReaderAbi from '~/contracts/abi/PriceHistoryReader.json';
import RSVP from 'rsvp';
import getAuditsFromFund from './getAuditsFromFund';

const debug = getDebug(__filename);

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.JSON_RPC_ENDPOINT),
);

const priceHistoryReaderAddress = '0x1f1173e263ba65923D62730cDA64aCeFF9f15a2C';

const AVERAGE_BLOCKTIME = 7; // 7.52

const transferAbi = Erc20Abi.find(
  e => e.name === 'Transfer' && e.type === 'event',
);

const zeroExLogFillAbi = ZeroExAbi.find(
  e => e.name === 'LogFill' && e.type === 'event',
);

// TODO: Remove kovan from addressBook
const getExchangeName = ofAddress =>
  (Object.entries(addressBook.kovan).find(
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

const getFundManager = address => ({
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
  let timestamp = timeSpanStart;
  while (timestamp <= timeSpanEnd) {
    const date = new Date(timestamp * 1000);
    relevantDates.push({
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    });
    timestamp += 86400;
  }
  // exclude current day
  // return R.take(relevantDates.length - 1, relevantDates);

  // with current day
  return relevantDates;
};

const extractPrices = (address, priceHistory) =>
  priceHistory.map(priceEntry => {
    if (priceEntry === null) {
      return 0;
    }
    const tokenAddresses = priceEntry.tokenAddresses.map(a => a.toLowerCase());
    const index = R.findIndex(R.equals(address.toLowerCase()))(tokenAddresses);
    // return index === -1 ? 0 : priceEntry.averagedPrices[index]; // for average prices
    return index === -1 ? 0 : priceEntry.prices[index]; // for first prices
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
    track: 'kovan-demo',
  };

  // 'https://kovan.melonport.com' ~ 605ms
  // 'https://kovan.infura.io/l8MnVFI1fXB7R6wyR22C' ~ 2000ms
  const informations = await getFundInformations(environment, {
    fundAddress,
  });

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

  const config = await getConfig(environment);
  debug({ addressBook, config, environment, url: environment.provider.url });

  const fundContract = await getFundContract(environment, fundAddress);

  const priceHistoryReader = new web3.eth.Contract(
    priceHistoryReaderAbi,
    priceHistoryReaderAddress,
  );

  /*
    web3.js contract
  */

  const currentBlock = await web3.eth.getBlockNumber();

  const transferEventSignature = web3.eth.abi.encodeEventSignature(transferAbi);

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

  const oasisDexTrades = await getFundRecentTrades(environment, {
    fundAddress,
    inlastXDays: 20,
  });

  const zeroExTrades = (await web3.eth.getPastLogs({
    fromBlock: web3.utils.numberToHex(inceptionBlockApprox),
    toBlock: 'latest',
    topics: [zeroExLogFillEventSignature],
  }))
    .map(log => {
      const logFill = web3.eth.abi.decodeLog(
        zeroExLogFillAbi.inputs,
        log.data,
        log.topics,
      );
      logFill.blockNumber = log.blockNumber;
      return logFill;
    })
    .filter(logFill => logFill.taker === fundAddress);

  const tokenSends = (await web3.eth.getPastLogs({
    fromBlock: web3.utils.numberToHex(inceptionBlockApprox),
    toBlock: web3.utils.numberToHex(currentBlock),
    // address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
    topics: [transferEventSignature, web3.utils.padLeft(fundAddress, 64)],
  })).map(parseTransferLog(config));

  const tokenReceives = (await web3.eth.getPastLogs({
    fromBlock: web3.utils.numberToHex(inceptionBlockApprox),
    toBlock: web3.utils.numberToHex(currentBlock),
    // address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
    topics: [transferEventSignature, null, web3.utils.padLeft(fundAddress, 64)],
  })).map(parseTransferLog(config));

  const shares = (await web3.eth.getPastLogs({
    fromBlock: web3.utils.numberToHex(inceptionBlockApprox),
    toBlock: web3.utils.numberToHex(currentBlock),
    address: fundAddress,
    topics: [transferEventSignature],
  })).map(parseTransferLog(config));

  debug(
    {
      tokenSends,
      tokenReceives,
      shares,
    },
    // new Date(blockBeforeInception.timestamp * 1000),
    // blockBeforeInception,
    // inceptionBlockApprox,
    // currentBlock,
    // fundAgeInSeconds,
    // informations.inception,
    // Erc20Abi,
    // transferAbi,
    // transferEventSignature,
    // web3jsFundContract,
  );

  const calculations = await performCalculations(environment, {
    fundAddress,
  });

  // TODO this returns the holdings of 'now', but we would start by inception
  const holdingsAndPrices = await getHoldingsAndPrices(environment, {
    fundAddress,
  });

  const audits = await getAuditsFromFund(environment, {
    fundAddress,
  });

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

  const allRedeems = await web3jsFundContract.getPastEvents('Redeemed', {
    // we cannot narrow the blocks by timestamp, so we get all events here
    fromBlock: 0,
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

  const [
    exchangeAddresses,
  ] = await fundContract.instance.getExchangeInfo.call();

  const ownCalculations = await fundContract.instance.performCalculations.call();
  const managementFee = ownCalculations[1].div(10 ** 18).toString();
  const performanceFee = ownCalculations[2].div(10 ** 18).toString();

  const strategy = getStrategy();

  const meta = {
    fundName: informations.name,
    fundAddress: informations.fundAddress,
    timeSpanStart,
    timeSpanEnd,
    manager: getFundManager(informations.owner),
    inception: Math.round(new Date(informations.inception).getTime() / 1000),
    quoteToken: {
      symbol: config.quoteAssetSymbol,
      address: getAddress(config, config.quoteAssetSymbol),
    },
    exchanges: exchangeAddresses.map(entry => ({
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

  // HOLDINGS AND PRICES
  const fundInceptionTimestamp = informations.inception.getTime() / 1000;
  const relevantDates = getRelevantDates(fundInceptionTimestamp, timeSpanEnd);

  const priceHistoryTasks = relevantDates.map(date => () =>
    priceHistoryReader.methods
      // .getAveragedPricesForDay(date.year, date.month, date.day)
      .getFirstAvailablePricesForDay(date.year, date.month, date.day)
      .call({})
      .then(res => res)
      .catch(() => null),
  );

  const priceHistory = await priceHistoryTasks.reduce(
    async (carryPromise, currentTask) => {
      const carry = await carryPromise;
      const currentResult = await currentTask();
      return [...carry, currentResult];
    },
    new Promise(resolve => resolve([])),
  );

  const holdingsWithoutPriceHistory = holdingsAndPrices.map(holding => ({
    token: {
      symbol: holding.name,
      address: getAddress(config, holding.name),
    },
    quantity: holding.balance.toString(),
    priceHistory: [],
  }));

  const holdings = holdingsWithoutPriceHistory.map(holding => ({
    ...holding,
    priceHistory: extractPrices(holding.token.address, priceHistory),
  }));

  // PREPARE SIMULATOR ACTIONS

  const investActions = invests.map(invest => ({
    type: 'INVEST',
    value: invest.amount.toString(),
    investor: invest.investor,
    timestamp: parseInt(invest.timestamp.toString(), 10),
  }));

  const redeemActions = redeems.map(redeem => ({
    type: 'REDEEM',
    shares: redeem.shares,
    investor: redeem.investor,
    timestamp: parseInt(redeem.timestamp, 10),
  }));

  const zeroExTradeActionTasks = zeroExTrades.map(trade => async () => ({
    type: 'TRADE',
    sellToken: getTokenByAddress(holdings, trade.makerToken),
    sellHowMuch: trade.filledMakerTokenAmount,
    buyToken: getTokenByAddress(holdings, trade.takerToken),
    buyHowMuch: trade.filledTakerTokenAmount,
    timestamp: (await web3.eth.getBlock(trade.blockNumber)).timestamp,
    exchange: getExchangeByName(meta.exchanges, 'ZeroExExchange'),
    transaction: trade.orderHash,
  }));

  const zeroExTradeActions = await Promise.all(
    zeroExTradeActionTasks.map(p => p()),
  );

  const oasisDexTradeActions = oasisDexTrades.map(trade => ({
    type: 'TRADE',
    sellToken: getTokenBySymbol(holdings, trade.sellToken),
    sellHowMuch: trade.sellQuantity.toString(),
    buyToken: getTokenBySymbol(holdings, trade.buyToken),
    buyHowMuch: trade.buyQuantity.toString(),
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
  debug('OrderedSimulatorActions', orderedSimulatorActions);

  const initialData = {
    meta,
    trades: [],
    participations: {
      investors: [],
      list: [],
    },
    holdings,
    audits,
  };

  const fund = fundSimulator(initialData);

  debug('Initial state', fund.getState());

  orderedSimulatorActions.forEach(action => fund.dispatch(action));

  const finalState = fund.getState();

  debug('Final Fund State', finalState);

  return finalState;
};

export default dataExtractor;
