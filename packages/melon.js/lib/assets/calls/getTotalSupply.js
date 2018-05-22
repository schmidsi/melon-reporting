// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import toReadable from '../utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * @returns total supply of a token by its symbol
 */
const getTotalSupply = async (
  environment: Environment,
  { symbol },
): Promise<BigNumber> => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, symbol);
  const totalSupply = await tokenContract.instance.totalSupply.call({}, []);

  return toReadable(config, totalSupply, symbol);
};

export default getTotalSupply;
