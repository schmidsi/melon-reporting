import axios from 'axios';
import * as R from 'ramda';
import { differenceInDays } from 'date-fns';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const symbolPriceKeyMap = R.cond([
  [R.equals('MKR'), R.always('open')],
  [R.equals('DAI'), R.always('open')], // both are good
  [R.equals('DGD'), R.always('close')],
  [R.equals('REP'), R.always('close')],
  [R.equals('ZRX'), R.always('close')],
  [R.equals('BAT'), R.always('close')],
  [R.equals('MLN'), R.always('close')],
  [R.equals('ANT'), R.always('close')],
  [R.equals('KNC'), R.always('close')],
  [R.equals('NMR'), R.always('close')],

  [R.equals('JNT'), R.always('open')],
  [R.equals('REQ'), R.always('open')],
  [R.T, R.always('close')],
]);

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
      {
        firstPrice: R.head(response.data.Data),
        lastPrice: R.last(response.data.Data),
      },
    );
    const histoDay = response.data.Data;
    const dailyAveragePrices = histoDay.map(day =>
      day[symbolPriceKeyMap(symbol)].toString(),
    ); // Note: Close price is the only one without errors
    return dailyAveragePrices;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default getPriceHistoryFromCryptoCompare;
