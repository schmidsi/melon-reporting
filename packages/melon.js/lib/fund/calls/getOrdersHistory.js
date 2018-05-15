// @flow
import getFundContract from '../contracts/getFundContract';
import getConfig from '../../version/calls/getConfig';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';
import getExchangeName from '../../exchange/utils/getExchangeName';
import isValidId from '../../utils/generic/isValidId';

/**
 * Get all the orders the fund has made so far, regardless of their status (active, canceled etc.)
 */

const getOrdersHistory = async (environment, { fundAddress }) => {
  const config = await getConfig(environment);
  const exchangeContract = await getMatchingMarketContract(environment);

  const fundContract = getFundContract(environment, fundAddress);
  const lastOrderIndex = await fundContract.instance.getLastOrderIndex.call(
    {},
    [],
  );

  if (!isValidId(lastOrderIndex)) {
    return [];
  }

  const getOrdersPromises = new Array(lastOrderIndex.toNumber() + 1)
    .fill(undefined)
    .map(async (val, index) => {
      const order = await fundContract.instance.orders.call({}, [index]);
      order.push(index);
      return order;
    });
  const orders = await Promise.all(getOrdersPromises);
  const formattedOrders = orders.map(async order => ({
    exchangeOrderId: parseInt(environment.api.util.bytesToHex(order[1]), 16),
    exchangeName: await getExchangeName(environment, order[0]),
    // The following will only work for oasisdex on chain orders.
    // HACK: order status is not updated on protocol level on fund contract if order is fully executed, so we query OasisDex to check if isActive
    isActive:
      (await getExchangeName(environment, order[0])) === 'MatchingMarket'
        ? await exchangeContract.instance.isActive.call({}, [
            parseInt(environment.api.util.bytesToHex(order[1]), 16),
          ])
        : 'N/A',
    orderType: order[2].toNumber() === 0 ? 'make' : 'take',
    sellSymbol:
      order[2] === 0
        ? getSymbol(config, order[3])
        : getSymbol(config, order[4]),
    buySymbol:
      order[2] === 0
        ? getSymbol(config, order[4])
        : getSymbol(config, order[3]),
    sellHowMuch:
      order[2] === 0
        ? toReadable(config, order[5], getSymbol(config, order[3]))
        : toReadable(config, order[6], getSymbol(config, order[4])),
    buyHowMuch:
      order[2] === 0
        ? toReadable(config, order[6], getSymbol(config, order[4]))
        : toReadable(config, order[5], getSymbol(config, order[3])),
    timestamp: toDate(order[7]),
    type:
      getSymbol(config, order[3]) === config.quoteAssetSymbol ? 'buy' : 'sell',
    price:
      getSymbol(config, order[3]) === config.quoteAssetSymbol
        ? toReadable(config, order[5], getSymbol(config, order[3])).div(
            toReadable(config, order[6], getSymbol(config, order[4])),
          )
        : toReadable(config, order[6], getSymbol(config, order[4])).div(
            toReadable(config, order[5], getSymbol(config, order[3])),
          ),
  }));
  return Promise.all(formattedOrders);
};

export default getOrdersHistory;
