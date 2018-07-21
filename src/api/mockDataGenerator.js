import exampleData from '../data/example-report-data.json';
import faker from 'faker';

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
      id: capitalizeFirstLetter(faker.lorem.word()) + ' Exchange',
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

const randomTokenWhitelist = () => {
  const whitelist = [];
  const max = 9;
  const min = 3;
  const to = Math.floor(Math.random() * (max - min + 1) + min);
  for (let i = 0; i < to; i++) {
    whitelist.push(randomTokenObject());
  }
  return whitelist;
};

const randomPolicy = () => {
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
    whitelist: randomTokenWhitelist(),
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

const randomMetaData = (fundAddress, timeSpanStart, timeSpanEnd) => {
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
  meta.policy = randomPolicy();

  return meta;
};

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async (fundAddress, timeSpanStart, timeSpanEnd) => {
  const mockedData = { data: {} };
  const data = mockedData.data;
  data.meta = randomMetaData(fundAddress, timeSpanStart, timeSpanEnd);
  return mockedData;
};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
