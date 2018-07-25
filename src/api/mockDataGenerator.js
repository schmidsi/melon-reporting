import exampleData from '../data/example-report-data.json';
import randomTrader from './randomTrader';
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

/*
// deprecated
const getPriceHistoryFromCryptoCompare = async (
  symbol,
  timeSpanStart,
  timeSpanEnd,
  whitelist,
) => {
  const numberOfDays = differenceInDays(
    new Date(timeSpanEnd * 1000),
    new Date(timeSpanStart * 1000),
  );

  const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=ETH&limit=${numberOfDays}&toTs=${timeSpanEnd}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const histoDay = json.Data;
    const dailyAveragePrices = histoDay.map(day => day.open); // open price for convenience
    return dailyAveragePrices;
  } catch (e) {
    console.error(e);
  }
};
*/

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
    symbol: 'WETH',
    address: randomEthereumAddress(),
  };
  meta.manager = randomEthereumAddress();
  meta.exchanges = randomExchanges();
  meta.legalEntity = randomLegalEntity();
  meta.strategy = randomStrategy();
  meta.policy = randomPolicy(tokenWhitelist);

  return meta;
};

// deprecated
/*
const randomHoldings = async (timeSpanStart, timeSpanEnd, whitelist) =>
  Promise.all(
    whitelist.map(async symbol => ({
      token: {
        symbol,
        address: randomEthereumAddress(),
      },
      quantity: toBigNum(faker.random.number(100)),
      priceHistory: await getPriceHistoryFromCryptoCompare(
        symbol,
        timeSpanStart,
        timeSpanEnd,
      ),
    })),
  );
*/

const randomInt = (from, to) => {
  return Math.floor(Math.random() * to) + from;
};

/*
// deprecated
const randomParticipations = (timeSpanStart, timeSpanEnd) =>
  R.range(1, randomInt(1, 10)).map(() => {
    return {
      investor: randomEthereumAddress(),
      token: randomTokenObject(),
      type: 'invest',
      amount: toBigNum(
        faker.random.number({ min: 100, max: 10000, precision: 1 }),
      ),
      shares: toBigNum(
        faker.random.number({ min: 100, max: 10000, precision: 1 }),
      ),
      timestamp: faker.date
        .between(new Date(timeSpanStart), new Date(timeSpanEnd))
        .getTime(),
    };
  });
*/

// deprecated
/*
const randomTrades = (timeSpanStart, timeSpanEnd, whitelist) => {
  const trades = [];
  let currentTimestamp = parseInt(timeSpanStart) + 10000;
  //R.range(20, randomInt(20, 50)).map(() => {
  while (currentTimestamp < parseInt(timeSpanEnd)) {
    trades.push({
      buy: {
        token: {
          symbol: "",
          address: ""
        },
        howMuch: ""
      },
      sell: {
        token: {
          symbol: "",
          address: ""
        },
        howMuch: ""
      },
      exchange: {
        id: "",
        address: ""
      },
      timestamp: 1524739030740,
      transaction: "0x76856aF5b24b29C8cDA09D8d27f527211747819c"
    });
    currentTimestamp += 10000000; // do a trade every 10000 seconds
  };
  return trades;
};
*/

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
    'DGX',
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
  const tradeData = await randomTrader(
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
