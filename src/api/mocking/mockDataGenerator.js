import exampleData from '../../data/example-report-data.json';
import melonTrader from './melonTrader';
import faker from 'faker';
import * as R from 'ramda';
import {
  randomEthereumAddress,
  capitalizeFirstLetter,
  toBigNum,
  randomPercentage,
  randomHexaDecimal,
} from './utils';

const randomExchanges = () => {
  const exchanges = [];
  const max = 5;
  const min = 1;
  const to = Math.floor(Math.random() * (max - min + 1) + min);
  for (let i = 0; i < to; i++) {
    exchanges.push({
      name: capitalizeFirstLetter(faker.lorem.word()) + ' Exchange',
      address: randomEthereumAddress(),
    });
  }
  return exchanges;
};

const randomLegalEntity = () => {
  const legalEntity = [];
  legalEntity.push(faker.company.bs() + ' Inc');
  legalEntity.push(
    faker.address.streetAddress() + ' ' + faker.address.streetName(),
  );
  legalEntity.push(faker.address.zipCode() + ' ' + faker.address.city());
  legalEntity.push(faker.address.country());
  return legalEntity;
};

const randomStrategy = () => {
  return faker.company.catchPhrase();
};

const randomTokenObject = () => {
  return {
    symbol: faker.finance.currencyCode(),
    address: randomEthereumAddress(),
  };
};

const createTokenWhitelist = whitelist =>
  whitelist.map(symbol => {
    return {
      symbol,
      address: randomEthereumAddress(),
    };
  });

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
    name: faker.commerce.productName() + ' ' + faker.address.country() + ' KYC',
    address: randomEthereumAddress(),
  };

  return policy;
};

const randomMetaData = (
  fundAddress,
  timeSpanStart,
  timeSpanEnd,
  tokenWhitelist,
) => {
  const meta = {};
  //meta.fundAddress = faker.finance.ethereumAddress();
  meta.fundName = faker.company.companyName();
  meta.fundAddress = fundAddress;
  meta.timeSpanStart = timeSpanStart;
  meta.timeSpanEnd = timeSpanEnd;
  meta.inception = Math.floor(
    faker.date.past(1, new Date(timeSpanStart * 1000)).getTime() / 1000,
  );
  meta.quoteToken = {
    symbol: 'ETH',
    address: randomEthereumAddress(),
  };
  meta.manager = randomEthereumAddress();
  meta.exchanges = randomExchanges();
  meta.legalEntity = randomLegalEntity();
  meta.strategy = randomStrategy();
  meta.policy = randomPolicy(tokenWhitelist);

  return meta;
};

const randomInt = (from, to) => {
  return Math.floor(Math.random() * to) + from;
};

const randomOpinion = () => {
  const opinions = [
    'Unqualified Opinion',
    'Qualified Opinion',
    'Adverse Opinion',
    'Disclaimer Of Opinion',
  ];
  return opinions[randomInt(0, 4)];
};

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

/// EXPORTED FUNCTIONS

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async (fundAddress, timeSpanStartStr, timeSpanEndStr) => {
  // timespans are strings, convert to int first
  const timeSpanStart = parseInt(timeSpanStartStr);
  const timeSpanEnd = parseInt(timeSpanEndStr);

  const mockedData = { data: {} };
  const data = mockedData.data;

  const tokenWhitelist = createTokenWhitelist([
    'ETH',
    'MLN',
    'ANT',
    'GNO',
    'MKR',
    'OMG',
  ]);

  data.meta = randomMetaData(
    fundAddress,
    timeSpanStart,
    timeSpanEnd,
    tokenWhitelist,
  );
  //data.holdings = await randomHoldings(timeSpanStart, timeSpanEnd, whitelist);
  //data.trades = randomTrades(timeSpanStart, timeSpanEnd, whitelist);
  //data.participations = randomParticipations(timeSpanStart, timeSpanEnd);
  const tradeData = await melonTrader(
    timeSpanStart,
    timeSpanEnd,
    tokenWhitelist,
    data.meta.exchanges,
  );
  data.trades = tradeData.trades;
  data.participations = tradeData.participations;
  data.holdings = tradeData.holdings;

  data.audits = randomAudits(timeSpanStart, timeSpanEnd);

  return mockedData;
};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
