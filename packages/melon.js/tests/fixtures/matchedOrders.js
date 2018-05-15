import BigNumber from 'bignumber.js';

const matchedOffers = [
  {
    _id: '9omLP8c3uu38NYhW6',
    id: 1,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('0.3'),
    },
    sell: {
      symbol: 'MLN-T',
      howMuch: new BigNumber('1'),
    },
  },
  {
    _id: 'XD2jNumheT5wwfqfx',
    id: 2,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('0.4'),
    },
    sell: {
      symbol: 'MLN-T',
      howMuch: new BigNumber('1'),
    },
  },
];

export default matchedOffers;
