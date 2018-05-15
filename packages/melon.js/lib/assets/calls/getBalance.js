// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import toReadable from '../utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * @returns the balance of a token for an address
 */
const getBalance = async (
  environment: Environment,
  { tokenSymbol, ofAddress },
): Promise<BigNumber> => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, tokenSymbol);
  const result = await tokenContract.instance.balanceOf.call({}, [ofAddress]);
  return toReadable(config, result, tokenSymbol);
};

export default getBalance;
