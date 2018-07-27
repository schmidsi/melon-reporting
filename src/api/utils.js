import faker from 'faker';

export const toBigNum = number => {
  return number + '.000000';
};

export const randomInt = (from, to) => Math.floor(Math.random() * to) + from;

export const randomFloat = (from, to) =>
  parseFloat((Math.random() * (from - to) + to).toFixed(4)); // only keep 4 decimals

// helper because faker.random.hexaDecimal() does not work
export const randomHexaDecimal = count => {
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
export const randomEthereumAddress = () => {
  return randomHexaDecimal(40);
};

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const randomPercentage = (min, max) =>
  faker.random.number({ min, max, precision: 0.01 });

//export const getHoldingIndexBySymbol = (holdings, symbol) => symbol;
