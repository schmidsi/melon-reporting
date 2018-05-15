// @flow
import getOrdersHistory from './getOrdersHistory';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Returns all the order the fund has made and whose status is active (this will only work for OasisDex order)
 */

const getOpenOrders = async (environment: Environment, { fundAddress }) => {
  const orders = await getOrdersHistory(environment, { fundAddress });
  return orders.filter(o => o.isActive && o.orderType === 'make');
};

export default getOpenOrders;
