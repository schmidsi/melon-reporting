/* eslint-disable */
({
  type: 'INVEST',
  value: '100',
  timestamp: getTimestamp(initialData, 0),
  investor: initialData.meta.manager,
});

({
  type: 'REDEEM',
  timestamp: getTimestamp(data, dayIndex),
  investor,
  shares: randomBigNumber(0, investor.shares),
});

({
  type: 'TRADE',
  sellToken,
  sellHowMuch,
  buyToken,
  buyHowMuch,
  timestamp: getTimestamp(data, dayIndex),
  exchange: faker.random.arrayElement(data.meta.exchanges),
  transaction: randomHexaDecimal(64),
});

({
  type: 'NOTHING',
  timestamp: getTimestamp(data, dayIndex),
});
