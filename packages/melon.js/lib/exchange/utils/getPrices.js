// @flow
import BigNumber from 'bignumber.js';

import type { Order } from '../schemas/Order';

/**
 * Prices computed from an Order
 */
export type Prices = {
  buy: BigNumber,
  sell: BigNumber,
};

/**
 * Get buy and sell prices for a given `order`
 */
const getPrices = (order: Order): Prices => ({
  buy: new BigNumber(order.sell.howMuch).div(order.buy.howMuch),
  sell: new BigNumber(order.buy.howMuch).div(order.sell.howMuch),
});

export default getPrices;
