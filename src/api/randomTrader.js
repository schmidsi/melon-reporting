import faker from 'faker';
import * as date from 'date-fns';
import { toBigNum, randomInt } from './utils';

const getPriceHistoryFromCryptoCompare = async (
  symbol,
  timeSpanStart,
  timeSpanEnd,
  whitelist,
) => {
  const numberOfDays = date.differenceInDays(
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

const randomHoldings = async (timeSpanStart, timeSpanEnd, tokenWhitelist) =>
  Promise.all(
    tokenWhitelist.map(async token => ({
      token,
      quantity: toBigNum(faker.random.number(100)),
      priceHistory: await getPriceHistoryFromCryptoCompare(
        token.symbol,
        timeSpanStart,
        timeSpanEnd,
      ),
    })),
  );

const randomTrader = async (
  timeSpanStart,
  timeSpanEnd,
  tokenWhitelist,
  exchanges,
) => {
  const trades = [];
  const participations = [];
  const holdings = [];

  const startHoldings = await randomHoldings(
    timeSpanStart,
    timeSpanEnd,
    tokenWhitelist,
  );

  //const oneDayInSeconds = 60 * 60 * 24;

  let tempTimeStamp = date.addDays(timeSpanStart, 1).getTime();

  for (
    tempTimeStamp;
    tempTimeStamp < timeSpanEnd;
    tempTimeStamp = date.addDays(tempTimeStamp, 1).getTime()
  ) {
    trades.push({
      buy: {
        token: tokenWhitelist[0],
        howMuch: '3.982323249',
      },
      sell: {
        token: tokenWhitelist[1],
        howMuch: '3.982323249',
      },
      exchange: exchanges[randomInt(0, exchanges.length)], // a random exchange from the exchanges whitelist
      timestamp: tempTimeStamp,
      transaction: '0x76856aF5b24b29C8cDA09D8d27f527211747819c',
    });
  }

  // TODO also return calculated sharepriceHistory & aumHistory
  // --> call our own functions for calculations

  return { trades, participations, holdings };
};

export default randomTrader;
