import * as R from 'ramda';
import BigNumber from 'bignumber.js';
import {
  ensure,
  getAddress,
  getCanonicalPriceFeedContract,
  getConfig,
  getFundContract,
  getFundInformations,
  getHoldingsAndPrices,
  getOrdersHistory,
  getParityProvider,
  getSymbol,
  performCalculations,
  toReadable,
} from '@melonproject/melon.js';

import Web3 from 'web3';
// for web3js

import * as addressBook from '@melonproject/smart-contracts/addressBook.json';
import VersionAbi from '@melonproject/smart-contracts/out/VersionInterface.abi.json';
import FundAbi from '@melonproject/smart-contracts/out/version/Fund.abi.json';
import Erc20Abi from '@melonproject/smart-contracts/out/ERC20Interface.abi.json';
import getAuditsFromFund from './getAuditsFromFund';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.JSON_RPC_ENDPOINT),
);

const AVERAGE_BLOCKTIME = 7; // 7.52

const transferAbi = Erc20Abi.find(
  e => e.name === 'Transfer' && e.type === 'event',
);

// TODO: Remove kovan from addressBook
const getExchangeName = ofAddress =>
  (Object.entries(addressBook.kovan).find(
    ([name, address]) => address === ofAddress,
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

const dataExtractor = async (fundAddress, _timeSpanStart, _timeSpanEnd) => {
  console.log(process.env.JSON_RPC_ENDPOINT);
  const provider = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  const environment = {
    ...provider,
    track: 'kovan-demo',
  };
  // 'https://kovan.melonport.com' ~ 605ms
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

  /*
    web3.js contract
  */

  const currentBlock = await web3.eth.getBlockNumber();

  const transferEventSignature = web3.eth.abi.encodeEventSignature(transferAbi);

  const web3jsFundContract = new web3.eth.Contract(FundAbi, fundAddress);

  const fundAgeInSeconds = Math.floor(
    (new Date() - informations.inception) / 1000,
  );

  const inceptionBlockApprox = Math.floor(
    currentBlock - fundAgeInSeconds / AVERAGE_BLOCKTIME,
  );

  const blockBeforeInception = await web3.eth.getBlock(inceptionBlockApprox);

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

  const holdingsAndPrices = await getHoldingsAndPrices(environment, {
    fundAddress,
  });

  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const audits = await getAuditsFromFund(environment, {
    fundAddress,
  });

  const ordersHistory = await getOrdersHistory(environment, {
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

  console.log(allRedeems);

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

  const participations = [...invests, ...redeems];

  const historyLength = await canonicalPriceFeedContract.instance.getHistoryLength.call();

  const priceHistoryPromises = R.range(
    historyLength - 200, // should be 0
    historyLength.toNumber(),
  ).map(i => () =>
    canonicalPriceFeedContract.instance.getHistoryAt.call({}, [i]),
  );

  const priceHistoryChunks = R.splitEvery(10, priceHistoryPromises);

  const priceHistory = await priceHistoryChunks.reduce(async (accP, chunk) => {
    const acc = await accP;
    const curr = await Promise.all(chunk.map(c => c()));
    // await new Promise(resolve => setTimeout(() => resolve(), 1000));
    // console.log('INTERVAL', curr);
    return [...acc, ...curr];
  }, new Promise(resolve => resolve([])));

  console.log(priceHistory);

  const preparedHistory = R.groupBy(
    entry => entry.address.toLowerCase(),
    R.flatten(
      priceHistory
        .map(([addresses, prices, timestamp]) => ({
          tokens: addresses.map(({ _value }) => ({
            address: _value,
            symbol: getSymbol(config, _value),
          })),
          prices: prices.map(({ _value }) => ({
            price: _value,
          })),
          timestamp,
        }))
        .map(({ tokens, prices, timestamp }) =>
          R.zipWith(
            (token, price) => ({
              ...token,
              ...price,
              timestamp,
            }),
            tokens,
            prices,
          ),
      ),
    ),
  );

  const [
    exchangeAddresses,
  ] = await fundContract.instance.getExchangeInfo.call();

  const meta = {
    fundName: informations.name,
    fundAddress: informations.fundAddress,
    timeSpanStart,
    timeSpanEnd,
    manager: informations.owner,
    inception: Math.round(new Date(informations.inception).getTime() / 1000),
    quoteToken: {
      symbol: config.quoteAssetSymbol,
      address: getAddress(config, config.quoteAssetSymbol),
    },
    exchanges: exchangeAddresses.map(entry => ({
      address: entry._value,
      name: getExchangeName(entry._value),
    })),
    totalSupply: calculations.totalSupply.toString(),
  };

  const holdings = holdingsAndPrices.map(holding => ({
    token: {
      symbol: holding.name,
      address: getAddress(config, holding.name),
    },
    quantity: holding.balance.toString(),
    priceHistory: [],
    /*
    priceHistory: preparedHistory[getAddress(config, holding.name)].map(entry =>
      toReadable(config, entry.price, holding.name),
    ),
    */
  }));

  const trades = [];

  return {
    data: {
      meta,
      participations,
      audits,
      holdings,
      trades,
    },
    debug: {
      lastRequestId,
      requests,
      ordersHistory,
      addressBook,
      exchangeAddresses,
      config,
      calculations,
      historyLength,
      // preparedHistory,
      // informations,
      // holdingsAndPrices,
      // lastHistoryEntry,
    },
  };
};

export default dataExtractor;
