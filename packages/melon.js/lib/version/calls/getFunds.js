// @flow
import getVersionContract from '../contracts/getVersionContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get addresses of funds starting from `startId`
 */
const getFunds = async (
  environment,
  startId: number = 0,
): Promise<Array<Address>> => {
  const versionContract = await getVersionContract(environment);

  const allFunds = await versionContract.instance.getFunds.call({}, [startId]);

  return allFunds;
};

export default getFunds;
