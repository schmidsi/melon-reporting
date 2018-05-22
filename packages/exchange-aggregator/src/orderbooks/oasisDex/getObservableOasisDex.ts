import { getOrderbook, getParityProvider } from '@melonproject/melon.js';
import * as Rx from 'rxjs';

const debug = require('debug')('exchange-aggregator:oasis-dex');

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);

const fetchOrderbook = options => environment =>
  Rx.Observable.fromPromise(getOrderbook(environment, options));

const getObservableOasisDex = (baseTokenSymbol, quoteTokenSymbol) => {
  const environment$ = Rx.Observable.fromPromise(getParityProvider());
  const orderbook$ = environment$
    .do(value => debug('Fetching.', value))
    .switchMap(
      fetchOrderbook({
        baseTokenSymbol,
        quoteTokenSymbol,
      }),
    )
    .do(value => debug('Receiving values.', value))
    .distinctUntilChanged()
    .map(labelOrders)
    .do(value => debug('Emitting order book.', value));

  return orderbook$.repeatWhen(Rx.operators.delay(10000));
};

export default getObservableOasisDex;
