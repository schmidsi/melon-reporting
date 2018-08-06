import axios from 'axios';
import * as R from 'ramda';
import { differenceInDays } from 'date-fns';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const getPriceHistoryFromCryptoCompare = async (
  symbol,
  timeSpanStart,
  timeSpanEnd,
) => {
  const numberOfDays =
    differenceInDays(
      new Date(timeSpanEnd * 1000),
      new Date(timeSpanStart * 1000),
    ) + 1;

  if (symbol === 'ETH') {
    // price of 1 for quote token
    return R.repeat('1', numberOfDays + 1);
  }

  // HACK: It seems that with JNT some close prizes are wrong
  // otherwise close prices are the best.
  // const key = symbol === 'JNT' ? 'open' : 'close';

  const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=ETH&limit=${numberOfDays}&toTs=${timeSpanEnd}`;

  try {
    const response = await axios.get(url);
    debug(
      'Got price from cryptocompare',
      symbol,
      response.data.Response,
      url,
      response,
    );
    const histoDay = response.data.Data;
    const dailyAveragePrices = histoDay.map(day => day.open.toString()); // Note: Close price is the only one without errors
    return dailyAveragePrices;
  } catch (e) {
    console.error(e);
  }
};

export default getPriceHistoryFromCryptoCompare;
