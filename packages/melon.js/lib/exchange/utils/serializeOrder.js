// @flow
import type { Order, SerializedOrder } from '../schemas/Order';

/**
 * Serialize an `order`. Serialisation means: Prepare data to be
 * stored in a database like MongoDB, redux store, JSON, ... --> Replace all
 * special objects like BigNumber or Date with a storeable string
 * representation.
 */
const serializeOrder = (order: Order): SerializedOrder => {
  const result = order;
  result.buy.howMuch = order.buy.howMuch.toString();
  result.sell.howMuch = order.sell.howMuch.toString();
  return result;
};

export default serializeOrder;
