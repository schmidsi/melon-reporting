// @flow
import toReadable from '../../assets/utils/toReadable';
import getSymbol from '../../assets/utils/getSymbol';
import getExchangeAdapterContract from '../contracts/getExchangeAdapterContract';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';
import type { Order, RawOrder } from '../schemas/Order';

/**
 * Gets the normalised order from the exchange specified by `id`.
 * Only if the order is active, it has the fields `buy` and `sell`
 */
const getOrder = async (environment: Environment, { id }): Promise<Order> => {
  const config = await getConfig(environment);
  const exchangeAdapterContract = await getExchangeAdapterContract(environment);

  const isActive: boolean = await exchangeAdapterContract.instance.isActive.call(
    {},
    [config.exchangeAddress, id],
  );
  const owner: string = await exchangeAdapterContract.instance.getOwner.call(
    {},
    [config.exchangeAddress, id],
  );
  const order: RawOrder = await exchangeAdapterContract.instance.getOrder.call(
    {},
    [config.exchangeAddress, id],
  );

  // if (isActive) console.log(isActive, order);

  const [sellWhichToken, buyWhichToken, sellHowMuch, buyHowMuch] = order;

  const enhancedOrder = {
    id,
    owner,
    isActive:
      isActive &&
      sellWhichToken !== '0x0000000000000000000000000000000000000000' &&
      buyWhichToken !== '0x0000000000000000000000000000000000000000',
  };

  // inactive orders have token set to 0x0000... so only enhance active orders
  if (isActive) {
    const sellSymbol = getSymbol(config, sellWhichToken);
    const buySymbol = getSymbol(config, buyWhichToken);

    enhancedOrder.sell = {
      symbol: sellSymbol,
      howMuch: toReadable(config, sellHowMuch, sellSymbol),
    };

    enhancedOrder.buy = {
      symbol: buySymbol,
      howMuch: toReadable(config, buyHowMuch, buySymbol),
    };
  }
  return enhancedOrder;
};

export default getOrder;
