import faker from 'faker';
import { differenceInDays } from 'date-fns';

const toBigNum = number => {
  return number + '.000000';
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

const randomTrader = async (timeSpanStart, timeSpanEnd, tokenWhitelist) => {
  const trades = [];
  const participations = [];
  const holdings = [];

  const startHoldings = await randomHoldings(
    timeSpanStart,
    timeSpanEnd,
    tokenWhitelist,
  );

  // TODO also return calculated sharepriceHistory & aumHistory
  // --> call our own functions for calculations

  return { trades, participations, holdings };
};

export default randomTrader;
