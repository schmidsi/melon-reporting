import BigNumber from 'bignumber.js';

const orders = [
  // MLN-T/ETH-T
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
      howMuch: new BigNumber('1.000000000000000'),
      // price: 3.3
    },
  },
  {
    _id: 'XD2jNumheT5wwfqfx',
    id: 2,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('0.400000000000000000'),
    },
    sell: {
      symbol: 'MLN-T',
      howMuch: new BigNumber('1.000000000000000000'),
      // price: 2.5
    },
  },
  {
    _id: '9omLP8c3uu38NYhW6',
    id: 3,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('0.500000000000000000'),
    },
    sell: {
      symbol: 'MLN-T',
      howMuch: new BigNumber('1.000000000000000000'),
      // price: 2
    },
  },

  // ...rest
  {
    _id: '3HgxC35zXnsfR6vft',
    id: 6870,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'REP-T',
      howMuch: new BigNumber('8.55505176'),
    },
    sell: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
  },
  {
    _id: 'uvXqcwkacpvBgJJZP',
    id: 6867,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'BTC-T',
      howMuch: new BigNumber('7.900000'),
    },
    sell: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
  },
  {
    _id: 'y6gYjzKP8mWhdajDF',
    id: 6876,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'EUR-T',
      howMuch: new BigNumber('1.5842999000'),
    },
    sell: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
  },
  {
    _id: '7tmGdFyGLuWa5wcYc',
    id: 6882,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'BTC-T',
      howMuch: new BigNumber('7.933100'),
    },
    sell: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
  },
  {
    _id: 'xbnp34skBKp22yzpi',
    id: 6884,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
    sell: {
      symbol: 'EUR-T',
      howMuch: new BigNumber('1.5800002000'),
    },
  },
  {
    _id: 'm4f8MKPqmxkE8Zm8x',
    id: 6885,
    owner: '0xDAEMON',
    isActive: true,
    buy: {
      symbol: 'EUR-T',
      howMuch: new BigNumber('1.5844933000'),
    },
    sell: {
      symbol: 'ETH-T',
      howMuch: new BigNumber('1.000000000000000000'),
    },
  },
];

export default orders;
