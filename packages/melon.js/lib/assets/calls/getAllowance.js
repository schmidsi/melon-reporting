// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import toReadable from '../utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * @returns the amount which spender is still allowed to withdraw from owner
 * @param tokenSymbol the symbol of the token. Example: "MLN-T"
 * @param ownerAddress holds the funds currently
 * @param spenderAddress is eligible to spend the funds
 */
const getAllowance: BigNumber = async (
  environment: Environment,
  { tokenSymbol, ownerAddress, spenderAddress },
): Promise<BigNumber> => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, tokenSymbol);
  const approvedAmount: BigNumber = await tokenContract.instance.allowance.call(
    {},
    [ownerAddress, spenderAddress],
  );

  return toReadable(config, approvedAmount, tokenSymbol);
};

export default getAllowance;
