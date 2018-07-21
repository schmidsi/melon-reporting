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

const createRandomExchangesArray = () => {
  exchanges = [];
  const max = 5;
  const min = 1;
  const to = Math.floor(Math.random() * (max - min + 1) + min);
  for (let i = 0; i < to; i++) {
    exchanges.push({});
  }
};

const createRandomMetaData = (fundAddress, timeSpanStart, timeSpanEnd) => {
  const meta = {};
  //meta.fundAddress = faker.finance.ethereumAddress();
  meta.fundName = faker.company.companyName();
  meta.fundAddress = fundAddress;
  meta.timeSpanStart = timeSpanStart;
  meta.timeSpanEnd = timeSpanEnd;
  meta.inception = Math.floor(
    faker.date.past(1, new Date(timeSpanStart * 1000)).getTime() / 1000,
  );
  console.log(randomEthereumAddress());
  //console.log(faker.finance.ethereumAddress());
  meta.quoteToken = {
    symbol: faker.finance.currencyCode(),
    address: randomEthereumAddress(),
  };
  meta.manager = randomEthereumAddress();
  meta.exchanges = {};

  console.log(meta);
  return meta;
};

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async (fundAddress, timeSpanStart, timeSpanEnd) => {
  const mockedData = { data: {} };
  const data = mockedData.data;
  data.meta = createRandomMetaData(fundAddress, timeSpanStart, timeSpanEnd);
  return mockedData;
};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
