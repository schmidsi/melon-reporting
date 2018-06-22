import {
  getConfig,
  getFundInformations,
  getFundContract,
  getHoldingsAndPrices,
  getParityProvider,
  getRanking,
  performCalculations,
  getAddress,
  getSymbol,
  getCanonicalPriceFeedContract,
  toReadable,
} from '@melonproject/melon.js';
import * as addressBook from '@melonproject/smart-contracts/addressBook.json';
import * as match from 'micro-match';
import * as Joi from 'joi';
import * as R from 'ramda';

// TODO: Remove kovan from addressBook
const getExchangeName = ofAddress =>
  (Object.entries(addressBook.kovan).find(
    ([name, address]) => address === ofAddress,
  ) || ['n/a'])[0];

const dataExtractor = async (
  fundAddress,
  _timeSpanStart,
  timeSpanEnd = Math.round(Date.now() / 1000),
) => {
  const environment = await getParityProvider('https://kovan.melonport.com');
  // 'https://kovan.melonport.com' ~ 605ms
  // 'https://kovan.infura.io/l8MnVFI1fXB7R6wyR22C' ~ 2000ms
  const informations = await getFundInformations(environment, {
    fundAddress,
  });

  const timeSpanStart =
    _timeSpanStart ||
    Math.round(new Date(informations.inception).getTime() / 1000);

  const config = await getConfig(environment);

  const calculations = await performCalculations(environment, {
    fundAddress,
  });

  const holdingsAndPrices = await getHoldingsAndPrices(environment, {
    fundAddress,
  });

  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const historyLength = await canonicalPriceFeedContract.instance.getHistoryLength.call();
  const lastHistoryEntry = await canonicalPriceFeedContract.instance.getHistoryAt.call(
    {},
    [historyLength - 1],
  );

  const priceHistoryPromises = R.range(
    historyLength - 200, // should be 0
    historyLength - 1,
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
            (token, price) => ({ ...token, ...price, timestamp }),
            tokens,
            prices,
          ),
        ),
    ),
  );

  const fundContract = await getFundContract(environment, fundAddress);

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
    totalSupply: calculations.totalSupply,
  };

  const holdings = holdingsAndPrices.map(holding => ({
    token: {
      symbol: holding.name,
      address: getAddress(config, holding.name),
    },
    balance: holding.balance,
    priceHistory: [
      preparedHistory[getAddress(config, holding.name)].map(entry =>
        toReadable(config, entry.price, holding.name),
      ),
    ],
  }));

  return {
    data: {
      meta,
      holdings,
    },
    debug: {
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

const ranking = async () => {
  const environment = await getParityProvider('https://kovan.melonport.com');
  return getRanking(environment);
};

module.exports = async req => {
  const start = Date.now();

  const paramsSchema = Joi.object().keys({
    fundAddress: Joi.string().regex(/^0x(\d|[A-F]|[a-f]){40}$/s),
    timeSpanStart: Joi.number()
      .integer()
      .min(0)
      .max(Date.now() / 1000),
    timeSpanEnd: Joi.number()
      .integer()
      .min(Joi.ref('timeSpanStart'))
      .max(Date.now() / 1000),
  });

  const params = match('/:fundAddress?/:timeSpanStart?/:timeSpanEnd?', req.url);

  const { error, value } = Joi.validate(params, paramsSchema);

  if (error) return error;

  const { fundAddress, timeSpanStart, timeSpanEnd } = value;

  // const fundAddress = '0x7610BC396863eEcDae03440756D992c82821F805';
  const data = fundAddress
    ? await dataExtractor(fundAddress, timeSpanStart, timeSpanEnd)
    : await ranking();
  const end = Date.now();
  const duration = end - start;
  return { data, duration };
};
