// @flow
import BigNumber from 'bignumber.js';
import getExchangeAdapterContract from '../contracts/getExchangeAdapterContract';
import getConfig from '../../version/calls/getConfig';

/**
 * gets last order id
 */
const getLastOrderId = async (environment): number => {
  const config = await getConfig(environment);
  const exchangeAdapterContract = await getExchangeAdapterContract(environment);
  const lastOrderIdBigNumber: BigNumber = await exchangeAdapterContract.instance.getLastOrderId.call(
    {},
    [config.exchangeAddress],
  );
  return lastOrderIdBigNumber.toNumber();
};

export default getLastOrderId;
