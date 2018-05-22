import * as R from 'ramda';
import * as Rx from 'rxjs';
import getObservableRelayer from './0x/getObservableRelayer';
import getObservableErcDex from './ercDex/getObservableErcDex';
import getObservableOasisDex from './oasisDex/getObservableOasisDex';

import { ExchangeEnum, Order } from '../index';

const debug = require('debug')('exchange-aggregator');

export type ExchangeCreator = (
  baseTokenAddress: string,
  quoteTokenSymbol: string,
) => Rx.Observable<Order[]>;

const exchangeToCreatorFunction: { [P in ExchangeEnum]: ExchangeCreator } = {
  RADAR_RELAY: (baseTokenSymbol, quoteTokenSymbol) =>
    getObservableRelayer(baseTokenSymbol, quoteTokenSymbol),
  OASIS_DEX: (baseTokenSymbol, quoteTokenSymbol) =>
    getObservableOasisDex(baseTokenSymbol, quoteTokenSymbol),
  ERC_DEX: (baseTokenSymbol, quoteTokenSymbol) =>
    getObservableErcDex(baseTokenSymbol, quoteTokenSymbol),
};

const concatOrderbooks = R.reduce<Order[], Order[]>(R.concat, []);

const sortOrderBooks = R.sort<Order>((a, b) => {
  if (a.type === b.type) {
    if (a.type === 'buy') {
      return b.price.minus(a.price).toNumber();
    }

    if (a.type === 'sell') {
      return a.price.minus(b.price).toNumber();
    }
  }

  return a.type === 'buy' ? 1 : -1;
});

const getAggregatedObservable = (
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  exchanges: ExchangeEnum[] = ['RADAR_RELAY', 'OASIS_DEX', 'ERC_DEX'],
) => {
  const exchanges$ = Rx.Observable.from<ExchangeEnum>(exchanges);
  const orderbooks$ = exchanges$
    .map(name => exchangeToCreatorFunction[name])
    .map(create => create(baseTokenSymbol, quoteTokenSymbol))
    .combineAll<Rx.Observable<Order[]>, Order[][]>()
    .do(value => debug('Emitting combined order book.', value))
    .distinctUntilChanged();

  // Concat and sort orders across all order books.
  return orderbooks$.map(R.compose(sortOrderBooks, concatOrderbooks));
};

export default getAggregatedObservable;
