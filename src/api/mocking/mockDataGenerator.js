import faker from 'faker';
import titleCase from 'title-case';
import * as R from 'ramda';
import { addMonths, min } from 'date-fns';

import { toTimestamp, parseTimestamp } from '~/utils/timestamp';

import exampleData from '../../data/example-report-data.json';

import {
  randomEthereumAddress,
  capitalizeFirstLetter,
  toBigNum,
  randomPercentage,
  randomHexaDecimal,
  toTimestampSeconds,
  randomBigNumber,
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
  legalEntity.push(
    `${titleCase(faker.company.bs())} ${faker.company.companySuffix()}`,
  );
  legalEntity.push(
    `${faker.address.streetAddress()} ${faker.address.streetName()}`,
  );
  legalEntity.push(`${faker.address.zipCode()} ${faker.address.city()}`);
  legalEntity.push(faker.address.country());
  return legalEntity;
};

const randomStrategy = () => R.times(faker.company.bs, 10).join(' ');

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
    // bestPrice: randomPercentage(0.05, 0.3),
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
    complianceModule: {
      name: `${faker.company.companyName()} KYC`,
      address: randomEthereumAddress(),
    },
    investmentFee: randomBigNumber(0, 0.1),
    redeemFee: randomBigNumber(0, 0.1),
  };

  return policy;
};

const randomMetaData = ({
  fundAddress,
  timeSpanStart,
  timeSpanEnd,
  tokenWhitelist,
}) => ({
  fundName: faker.company.companyName(),
  fundAddress,
  timeSpanStart,
  timeSpanEnd,
  inception: timeSpanStart,
  quoteToken: tokenWhitelist[0],
  managementFee: randomBigNumber(0, 0.1),
  performanceFee: randomBigNumber(0, 0.7),
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
  R.range(0, numberOfInvestors).map(() => ({
    address: randomEthereumAddress(),
    name: faker.name.findName(),
  }));

const randomAudits = (from, to) =>
  R.range(0, randomInt(1, 3)).map(() => {
    const timespanStart = toTimestamp(
      faker.date.between(parseTimestamp(from), parseTimestamp(to)),
    );

    const timespanEnd = toTimestamp(
      min(
        parseTimestamp(to),
        addMonths(parseTimestamp(timespanStart), randomInt(1, 3)),
      ),
    );

    return {
      auditor: {
        address: randomEthereumAddress(),
        name: faker.company.companyName(),
      },
      dataHash: randomHexaDecimal(64),
      timespanStart,
      timespanEnd,
      timestamp: toTimestamp(
        faker.date.between(parseTimestamp(timespanEnd), new Date()),
      ),
      opinion: randomOpinion(),
      comment: faker.hacker.phrase(),
      timestamp: auditEnd + 450,
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
  tokenWhiteList = [
    'ETH',
    'DAI',
    'MKR',
    'DGD',
    'REP',
    'MLN',
    'BAT',
    'ZRX',
    'KNC',
    'JNT',
    'OMG',
    'ANT',
    'GNO',
    'REQ',
    'NMR',
    // 'DGX',
  ],
} = {}) => {
  const meta = randomMetaData({
    fundAddress: randomEthereumAddress(),
    timeSpanStart: inception,
    timeSpanEnd: now,
    tokenWhitelist: createTokenWhitelist(tokenWhiteList),
  });

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
