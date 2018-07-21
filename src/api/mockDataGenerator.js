import exampleData from '../data/example-report-data.json';
import faker from 'faker';
import { differenceInDays } from 'date-fns';
import * as R from 'ramda';

// helper because faker.random.hexaDecimal() does not work
const randomHexaDecimal = count => {
  if (typeof count === 'undefined') {
    count = 1;
  }

  var wholeString = '';
  for (var i = 0; i < count; i++) {
    wholeString += faker.random.arrayElement([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]);
  }

  return '0x' + wholeString;
};

// helper because faker.finance.ethereumAddress() does not work
const randomEthereumAddress = () => {
  return randomHexaDecimal(40);
};

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

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

const toBigNum = number => {
  return number + '.000000';
};

const randomPercentage = (min, max) => {
  return faker.random.number({ min, max, precision: 0.01 });
};

const randomTokenObject = () => {
  return {
    symbol: faker.finance.currencyCode(),
    address: randomEthereumAddress(),
  };
};

const createTokenWhitelist = whitelist => {
  return whitelist.map(symbol => {
    return {
      symbol,
      address: randomEthereumAddress(),
    };
  });
  /*
  const whitelist = [];
  const max = 9;
  const min = 3;
  const to = Math.floor(Math.random() * (max - min + 1) + min);
  for (let i = 0; i < to; i++) {
    whitelist.push(randomTokenObject());
  }
  return whitelist;
  */
};

const randomPolicy = whitelist => {
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
    whitelist: createTokenWhitelist(whitelist),
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
    const dailyAveragePrices = histoDay.map(day => day.open);
    console.log(dailyAveragePrices);
    return dailyAveragePrices;
  } catch (e) {
    console.error(e);
  }
};

const randomMetaData = (fundAddress, timeSpanStart, timeSpanEnd, whitelist) => {
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
  meta.policy = randomPolicy(whitelist);

  return meta;
};

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

const randomParticipations = (timeSpanStart, timeSpanEnd) => {
  const participations = [];
  R.range(1, Math.floor(Math.random() * 10 + 1)).map(() => {
    participations.push({
      investor: randomEthereumAddress(),
      token: randomTokenObject(),
      type: 'invest',
      amount: toBigNum(
        faker.random.number({ min: 100, max: 10000, precision: 1 }),
      ),
      shares: toBigNum(
        faker.random.number({ min: 100, max: 10000, precision: 1 }),
      ),
      timestamp: faker.date.between({ from: timeSpanStart, to: timeSpanEnd }), // TODO
    });
  });
  return participations;
};

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async (fundAddress, timeSpanStart, timeSpanEnd) => {
  const mockedData = { data: {} };
  const data = mockedData.data;

  const whitelist = ['MLN', 'ANT', 'DGX', 'MKR', 'OMG'];

  data.meta = randomMetaData(
    fundAddress,
    timeSpanStart,
    timeSpanEnd,
    whitelist,
  );
  data.holdings = await randomHoldings(timeSpanStart, timeSpanEnd, whitelist);
  data.trades = [];
  data.participations = randomParticipations(timeSpanStart, timeSpanEnd);
  data.audits = [];

  return mockedData;
};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
