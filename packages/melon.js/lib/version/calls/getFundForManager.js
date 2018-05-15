// @flow
import getVersionContract from '../contracts/getVersionContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get fund address for a given `managerAddress`
 * _Hint_: If multiple funds existing for one manager, the latest fund is returned
 */
const getFundForManager = async (
  environment,
  { managerAddress },
): Promise<Address | false> => {
  const versionContract = await getVersionContract(environment);
  const fundAddress = await versionContract.instance.managerToFunds.call({}, [
    managerAddress,
  ]);

  if (fundAddress === '0x0000000000000000000000000000000000000000')
    return false;
  return fundAddress;
};

export default getFundForManager;
