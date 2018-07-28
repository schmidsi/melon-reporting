import faker from 'faker';
import * as date from 'date-fns';
import {
  randomInt,
  randomBigNumber,
  randomHexaDecimal,
  randomEthereumAddress,
} from './utils';

import {
  add,
  subtract,
  multiply,
  divide,
  greaterThan,
} from '../../utils/functionalBigNumber';

import * as R from 'ramda';

import { calculateAumHistory } from '../calculations';

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
    // price of 1 for quote token
    return R.repeat('1', numberOfDays + 1);
  }

  const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=ETH&limit=${numberOfDays}&toTs=${timeSpanEnd}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const histoDay = json.Data;
    const dailyAveragePrices = histoDay.map(day => day.close.toString()); // open price for convenience
    return dailyAveragePrices;
  } catch (e) {
    console.error(e);
  }
};

const randomHoldings = async (timeSpanStart, timeSpanEnd, tokenWhitelist) =>
  Promise.all(
    tokenWhitelist.map(async token => ({
      token,
      // TODO maybe change back to bigNum sometime, which would be a string
      //quantity: toBigNum(faker.random.number(100)),
      //quantity: faker.random.number(100),
      quantity: randomInt(50, 100).toString(),
      priceHistory: await getPriceHistoryFromCryptoCompare(
        token.symbol,
        timeSpanStart,
        timeSpanEnd,
      ),
    })),
  );

const randomInitialParticipations = (investors, timestamp, quoteToken) => {
  return investors.map(investor => {
    return {
      investor,
      token: quoteToken,
      type: 'invest',
      amount: randomBigNumber(1.0, 1000.0), // TODO calc
      shares: randomBigNumber(1.0, 1000.0), // TODO calc
      timestamp,
    };
  });
};

const randomInvestors = numberOfInvestors => {
  return Array.apply(null, { length: numberOfInvestors }).map(() =>
    randomEthereumAddress(),
  );
};

const getRandomInvestor = investors =>
  investors[randomInt(0, investors.length - 1)];

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

  const investors = randomInvestors(6);
  const participations = randomInitialParticipations(
    investors,
    timeSpanStartInSeconds,
    tokenWhitelist[0],
  );

  let tempHoldings = R.clone(startHoldings);
  let dailyHoldings = [];

  let tempTimeStamp = date.addDays(timeSpanStart, 1).getTime();
  let dayIndex = 0;

  // TODO initial shareprice

  for (
    tempTimeStamp;
    tempTimeStamp < timeSpanEnd;
    tempTimeStamp = date.addDays(tempTimeStamp, 1).getTime()
  ) {
    const holdingsOfToday = tempHoldings.map(holding => {
      return {
        token: holding.token,
        quantity: holding.quantity,
        price: holding.priceHistory[dayIndex],
      };
    });

    dailyHoldings.push(holdingsOfToday);

    // do an invest every 10 days
    if (dayIndex % 10 === 0) {
      const invest = {
        investor: getRandomInvestor(investors),
        token: tokenWhitelist[0], // quote token
        type: 'invest',
        amount: randomBigNumber(1.0, 1000.0), // TODO calc
        shares: randomBigNumber(1.0, 1000.0), // TODO calc
        timestamp: tempTimeStamp / 1000,
      };
      participations.push(invest);

      // add to holdings
      tempHoldings[0].quantity = add(tempHoldings[0].quantity, invest.amount);
    }

    // do a redeem every 17 days
    if (dayIndex % 17 === 0) {
      const redeem = {
        investor: getRandomInvestor(investors),
        token: tokenWhitelist[0], // quote token
        type: 'redeem',
        amount: randomBigNumber(1.0, 1000.0), // TODO calc
        shares: randomBigNumber(1.0, 1000.0), // TODO calc
        timestamp: tempTimeStamp / 1000,
      };

      if (greaterThan(tempHoldings[0].quantity, redeem.amount)) {
        // only do redeem when enough quoteTokens are there
        participations.push(redeem);

        // subtract from holdings
        tempHoldings[0].quantity = subtract(
          tempHoldings[0].quantity,
          redeem.amount,
        );
      }
    }

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

    // sell between 0.0 and half of the current sell holding
    //console.log(currentSellTokenQuantity, toNumber(currentSellTokenQuantity));
    const sellHowMuch = randomBigNumber(
      0.0,
      divide(currentSellTokenQuantity, 2),
    );
    const buyHowMuch = multiply(
      sellHowMuch,
      divide(sellTokenDailyPrice, buyTokenDailyPrice),
    );

    // add trade
    trades.push({
      buy: {
        token: buyToken,
        howMuch: buyHowMuch,
      },
      sell: {
        token: sellToken,
        howMuch: sellHowMuch,
      },
      exchange: exchanges[randomInt(0, exchanges.length - 1)], // a random exchange from the exchanges whitelist
      timestamp: tempTimeStamp / 1000,
      transaction: randomHexaDecimal(64),
    });

    // update holdings
    tempHoldings = tempHoldings.map(oldHolding => {
      const holding = { ...oldHolding };
      if (holding.token.symbol === buyToken.symbol) {
        holding.quantity = add(currentBuyTokenQuantity, buyHowMuch);
      } else if (holding.token.symbol === sellToken.symbol) {
        holding.quantity = subtract(currentSellTokenQuantity, sellHowMuch);
      }
      return holding;
    });

    dayIndex++;
  }

  // TODO also return calculated sharepriceHistory & aumHistory
  // --> call our own functions for calculations

  const holdings = tempHoldings;

  const aumHistory = calculateAumHistory(dailyHoldings);
  const totalSupplyHistory = [];
  const sharePrice = -1;
  const sharePriceHistory = [];
  const sharpeRatio = [];
  const fundVolatility = [];
  const profit = [];
  const transactionFees = [];
  const assetCorrelation = [];
  const assetPercentageHistory = [];
  const assetPriceChangeHistory = [];
  const profitablilityPerTrade = [{ tradeTxHash: '0x1', profitability: 1.0 }];
  const sharesPerInvestorHistory = [];

  return {
    trades,
    participations,
    holdings,
    aumHistory,
    totalSupplyHistory,
    sharePrice,
    sharePriceHistory,
    sharpeRatio,
    fundVolatility,
    profit,
    transactionFees,
    assetCorrelation,
    assetPercentageHistory,
    assetPriceChangeHistory,
    profitablilityPerTrade,
    sharesPerInvestorHistory,
  };
};

export default melonTrader;
