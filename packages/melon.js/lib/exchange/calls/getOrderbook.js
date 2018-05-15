// @flow
import { mapAccum } from 'ramda';
import BigNumber from 'bignumber.js';
import getActiveOrders from './getActiveOrders';

import type { Order } from '../schemas/Order';

/**
 * Gets orderbook with cumulative Volume for `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair, ordered by price.
 */
const getOrderbook = async (
  environment,
  { baseTokenSymbol, quoteTokenSymbol },
): Promise<[Order]> => {
  const cleanedOrderbook: [Order] = await getActiveOrders(environment, {
    baseTokenSymbol,
    quoteTokenSymbol,
  });

  const totalSellCumulativeVolume: BigNumber = cleanedOrderbook.reduce(
    (previousVolume: BigNumber, currentOrder: Order) =>
      currentOrder.type === 'sell'
        ? previousVolume.add(currentOrder.sell.howMuch)
        : previousVolume,
    new BigNumber(0),
  );

  const orderbook: [Order] = mapAccum(
    (accumulator: BigNumber, currentOrder: Order) => {
      const enhancedOrder: Order = { ...currentOrder };
      if (enhancedOrder.type === 'sell') {
        enhancedOrder.cumulativeVolume = accumulator;
        return [accumulator.minus(enhancedOrder.sell.howMuch), enhancedOrder];
      } else if (enhancedOrder.type === 'buy') {
        enhancedOrder.cumulativeVolume = accumulator.add(
          enhancedOrder.buy.howMuch,
        );
        return [enhancedOrder.cumulativeVolume, enhancedOrder];
      }
      throw new Error(
        `Order type must be specified ${JSON.stringify(enhancedOrder)}`,
      );
    },
    totalSellCumulativeVolume,
    cleanedOrderbook,
  )[1];

  return orderbook;
};

export default getOrderbook;
