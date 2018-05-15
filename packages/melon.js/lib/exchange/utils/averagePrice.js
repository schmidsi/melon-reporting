// @flow
import BigNumber from 'bignumber.js';

import type { Order } from '../schemas/Order';
import type { BuyOrSell } from '../schemas/BuyOrSell';

/**
 * Calculates the average price over a set of `orders`
 * @param orders need to be sorted and filtered with `matchOrders`
 */
const averagePrice = (orderType: BuyOrSell, orders: [Order]): BigNumber => {
  const cumulatedVolumes = orders.reduce(
    (accumulator, current) => ({
      buy: accumulator.buy.add(current.buy.howMuch),
      sell: accumulator.sell.add(current.sell.howMuch),
    }),
    {
      buy: new BigNumber(0),
      sell: new BigNumber(0),
    },
  );

  if (orderType === 'buy') {
    return cumulatedVolumes.sell.div(cumulatedVolumes.buy);
  } else if (orderType === 'sell') {
    return cumulatedVolumes.buy.div(cumulatedVolumes.sell);
  }

  throw new Error('You need to specify offerType to be either "sell" or "buy"');
};

export default averagePrice;
