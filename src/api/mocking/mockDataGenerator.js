import faker from 'faker';
import * as R from 'ramda';
import exampleData from '../../data/example-report-data.json';

import {
  randomEthereumAddress,
  capitalizeFirstLetter,
  toBigNum,
  randomPercentage,
  randomHexaDecimal,
  toTimestampSeconds,
} from './utils';
import getPriceHistoryFromCryptoCompare from './utils/getPriceHistoryFromCryptoCompare';

const randomExchanges = () => {
  const exchanges = [];
  const to = randomInt(2, 5);
  for (let i = 0; i < to; i++) {
    exchanges.push({
      name: `${capitalizeFirstLetter(faker.lorem.word())} Exchange`,
      address: randomEthereumAddress(),
    });
  }
  return exchanges;
};

const randomLegalEntity = () => {
  const legalEntity = [];
  legalEntity.push(`${faker.company.bs()} Inc`);
  legalEntity.push(
    `${faker.address.streetAddress()} ${faker.address.streetName()}`,
  );
  legalEntity.push(`${faker.address.zipCode()} ${faker.address.city()}`);
  legalEntity.push(faker.address.country());
  return legalEntity;
};

const randomStrategy = () => faker.company.catchPhrase();

const randomTokenObject = () => ({
  symbol: faker.finance.currencyCode(),
  address: randomEthereumAddress(),
});

const createTokenWhitelist = whitelist =>
  whitelist.map(symbol => ({
    symbol,
    address: randomEthereumAddress(),
  }));

const randomPolicy = tokenWhitelist => {
  const policy = {};
  policy.portfolio = {
    maxPositions: faker.random.number({ min: 50, max: 200, precision: 1 }),
    bestPrice: faker.random.number({ min: 0.05, max: 0.3, precision: 0.01 }),
    bestPrice: randomPercentage(0.05, 0.3),
    maxTrades: {
      threshold: faker.random.number({ min: 20, max: 120, precision: 1 }),
      timeperiod: 'month',
    },
    maxVolume: {
      threshold: toBigNum(
        faker.random.number({ min: 1000, max: 20000, precision: 100 }),
      ),
      timeperiod: 'month',
    },
    volatilityThreshold: randomPercentage(0.1, 0.5),
  };
  policy.tokens = {
    whitelist: tokenWhitelist,
    liquidityInDays: faker.random.number(50),
    marketCapRange: {
      min: faker.random.number({ min: 100000, max: 1000000, precision: 10000 }),
      max: faker.random.number({
        min: 10000000,
        max: 20000000,
        precision: 10000,
      }),
    },
    volatilityThreshold: randomPercentage(0.1, 0.5),
  };
  policy.participation = {
    name: `${faker.commerce.productName()} ${faker.address.country()} KYC`,
    address: randomEthereumAddress(),
  };

  return policy;
};

const randomMetaData = (
  fundAddress,
  timeSpanStart,
  timeSpanEnd,
  tokenWhitelist,
) => ({
  fundName: faker.company.companyName(),
  fundAddress,
  timeSpanStart,
  timeSpanEnd,
  inception: timeSpanStart,
  quoteToken: tokenWhitelist[0],
  manager: {
    address: randomEthereumAddress(),
    name: faker.name.findName(),
  },
  exchanges: randomExchanges(),
  legalEntity: randomLegalEntity(),
  strategy: randomStrategy(),
  policy: randomPolicy(tokenWhitelist),
});

const randomInt = (from, to) => Math.floor(Math.random() * to) + from;

const randomOpinion = () => {
  const opinions = [
    'Unqualified Opinion',
    'Qualified Opinion',
    'Adverse Opinion',
    'Disclaimer Of Opinion',
  ];
  return opinions[randomInt(0, 4)];
};

const randomInvestors = numberOfInvestors =>
  Array(...{ length: numberOfInvestors }).map(() => ({
    address: randomEthereumAddress(),
    name: faker.name.findName(),
  }));

const randomAudits = (timeSpanStart, timeSpanEnd) =>
  R.range(5, randomInt(5, 10)).map(() => {
    const auditStart = faker.date
      .between(new Date(timeSpanStart), new Date(timeSpanEnd))
      .getTime();
    const auditEnd = auditStart + 10000;
    return {
      auditor: randomEthereumAddress(),
      dataHash: randomHexaDecimal(64),
      timeSpanStart: auditStart,
      timeSpanEnd: auditEnd,
      opinion: randomOpinion(),
      comment: faker.hacker.phrase(),
    };
  });

// / EXPORTED FUNCTIONS

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockRandomEmptyFund = async ({
  inception = 1514764800,
  now = toTimestampSeconds(new Date()),
  tokenWhiteList = ['ETH', 'MLN', 'ANT', 'GNO', 'MKR', 'OMG'],
} = {}) => {
  const meta = randomMetaData(
    randomEthereumAddress(),
    inception,
    now,
    createTokenWhitelist(tokenWhiteList),
  );

  const holdings = await Promise.all(
    meta.policy.tokens.whitelist.map(async token => ({
      token,
      quantity: '0',
      priceHistory: await getPriceHistoryFromCryptoCompare(
        token.symbol,
        meta.timeSpanStart,
        meta.timeSpanEnd,
      ),
    })),
  );

  return {
    meta,
    trades: [],
    participations: {
      investors: [meta.manager, ...randomInvestors(randomInt(1, 10))],
      list: [],
    },
    holdings,
    audits: randomAudits(meta.timeSpanStart, meta.timeSpanEnd),
  };
};

export { mockStaticData, mockRandomEmptyFund };
