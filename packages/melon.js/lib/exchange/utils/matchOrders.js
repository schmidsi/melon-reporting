// @flow
import BigNumber from 'bignumber.js';

import getPrices from './getPrices';

import type { BuyOrSell } from '../schemas/BuyOrSell';
import type { Order } from '../schemas/Order';

/**
 * Filter and sort `orders` that match `orderType` and `priceThreshold`.
 * @param orders orders from the same asset pair
 */
const matchOrders = (
  orderType: BuyOrSell,
  priceThreshold: BigNumber,
  orders: Array<Order>,
): Array<Order> => {
  if (orderType === 'sell') {
    return orders
      .filter((order: Order) => getPrices(order).sell.lte(priceThreshold))
      .sort(
        (a: Order, b: Order) =>
          getPrices(a).sell.gt(getPrices(b).sell) ? -1 : 1,
      );
  } else if (orderType === 'buy') {
    return orders
      .filter((order: Order) => getPrices(order).buy.gte(priceThreshold))
      .sort(
        (a: Order, b: Order) =>
          getPrices(a).buy.gt(getPrices(b).buy) ? -1 : 1,
      );
  }

  throw new Error('You need to specify orderType to be either "sell" or "buy"');
};

export default matchOrders;
