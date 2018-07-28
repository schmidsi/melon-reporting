import faker from 'faker';
import * as date from 'date-fns';
import { toBigNum, randomInt, randomFloat, randomHexaDecimal } from './utils';
import * as R from 'ramda';

const getPriceHistoryFromCryptoCompare = async (
  symbol,
  timeSpanStart,
  timeSpanEnd,
) => {
  const numberOfDays = date.differenceInDays(
    new Date(timeSpanEnd * 1000),
    new Date(timeSpanStart * 1000),
  );

  if (symbol === 'ETH') {
    // price of 0 for quote token
    return Array.apply(null, Array(numberOfDays + 1)).map(
      Number.prototype.valueOf,
      1,
    );
  }

  const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=ETH&limit=${numberOfDays}&toTs=${timeSpanEnd}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const histoDay = json.Data;
    const dailyAveragePrices = histoDay.map(day => day.close); // open price for convenience
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

const melonTrader = async (
  timeSpanStartInSeconds,
  timeSpanEndInSeconds,
  tokenWhitelist,
  exchanges,
) => {
  const startHoldings = await randomHoldings(
    timeSpanStartInSeconds,
    timeSpanEndInSeconds,
    tokenWhitelist,
  );

  const timeSpanStart = timeSpanStartInSeconds * 1000;
  const timeSpanEnd = timeSpanEndInSeconds * 1000;

  const trades = [];
  const participations = [];

  console.log(startHoldings);
  let tempHoldings = R.clone(startHoldings);

  let tempTimeStamp = date.addDays(timeSpanStart, 1).getTime();
  let dayIndex = 0;

  for (
    tempTimeStamp;
    tempTimeStamp < timeSpanEnd;
    tempTimeStamp = date.addDays(tempTimeStamp, 1).getTime()
  ) {
    // calc possible trade

    let buyToken;
    let sellToken;
    // one token is always the quote token, the other one from the rest of the whitelist
    if (faker.random.boolean()) {
      buyToken = tokenWhitelist[0];
      sellToken = faker.random.arrayElement(R.tail(tokenWhitelist));
    } else {
      buyToken = faker.random.arrayElement(R.tail(tokenWhitelist));
      sellToken = tokenWhitelist[0];
    }

    const buyTokenHolding = tempHoldings.find(holding => {
      return holding.token.symbol === buyToken.symbol;
    });
    const buyTokenDailyPrice = buyTokenHolding.priceHistory[dayIndex];

    const sellTokenHolding = tempHoldings.find(holding => {
      return holding.token.symbol === sellToken.symbol;
    });
    const sellTokenDailyPrice = sellTokenHolding.priceHistory[dayIndex];

    if (buyTokenDailyPrice === undefined || sellTokenDailyPrice === undefined) {
      // just skip this day when price is not available for a token from cryptocompare
      dayIndex++;
      continue;
    }

    const currentSellTokenQuantity = sellTokenHolding.quantity;
    const currentBuyTokenQuantity = buyTokenHolding.quantity;

    // sell between 0.001 and half of the current sell holding
    const sellHowMuch = randomFloat(0.001, currentSellTokenQuantity / 2);
    const buyHowMuch = sellHowMuch * (sellTokenDailyPrice / buyTokenDailyPrice);

    // add trade
    trades.push({
      buy: {
        token: buyToken,
        howMuch: buyHowMuch.toString(),
      },
      sell: {
        token: sellToken,
        howMuch: sellHowMuch.toString(),
      },
      exchange: exchanges[randomInt(0, exchanges.length)], // a random exchange from the exchanges whitelist
      timestamp: tempTimeStamp / 1000,
      transaction: randomHexaDecimal(64),
    });

    // update holdings
    //console.log(`1: ${tempHoldings[0].quantity}`);
    tempHoldings = tempHoldings.map(oldHolding => {
      const holding = { ...oldHolding };
      if (holding.token.symbol === buyToken.symbol) {
        holding.quantity = (
          parseInt(currentBuyTokenQuantity) + buyHowMuch
        ).toString();
        return holding;
      } else if (holding.token.symbol === sellToken.symbol) {
        //console.log(`1: ${holding.quantity}`);
        holding.quantity = (
          parseInt(currentSellTokenQuantity) - sellHowMuch
        ).toString();
        return holding;
        //console.log(`2: ${holding.quantity}`);
      }
      //return newHolding;
      return holding;
    });
    //console.log(`2: ${tempHoldings[0].quantity}`);

    dayIndex++;
  }

  // TODO also return calculated sharepriceHistory & aumHistory
  // --> call our own functions for calculations

  console.log(tempHoldings);

  const holdings = tempHoldings;

  return { trades, participations, holdings };
};

export default melonTrader;
