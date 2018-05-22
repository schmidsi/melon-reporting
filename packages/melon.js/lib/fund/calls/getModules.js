// @flow
import getFundContract from '../contracts/getFundContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Returns the addresses of all modules linked to the fund at `fundAddress`
 */
const getModules = async (fundAddress: Address): Promise<[Address]> => {
  const fundContract = getFundContract(fundAddress);

  const modules = await fundContract.instance.getModules.call();

  return modules;
};

export default getModules;
