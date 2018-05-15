// @flow
import BigNumber from 'bignumber.js';

import type { Order, SerializedOrder } from '../schemas/Order';

/**
 * Deserializes an `order`, where serialisation means: Prepare data to be
 * stored in a database like MongoDB, redux store, JSON, ... --> Replace all
 * special objects like BigNumber or Date with a storeable string
 * representation.
 *
 * Deserialisation means: Create these special objects again from their string
 * representation.
 */
const deserializeOrder = (order: SerializedOrder): Order => {
  const result = order;
  result.buy.howMuch = new BigNumber(order.buy.howMuch);
  result.sell.howMuch = new BigNumber(order.sell.howMuch);
  return result;
};

export default deserializeOrder;
