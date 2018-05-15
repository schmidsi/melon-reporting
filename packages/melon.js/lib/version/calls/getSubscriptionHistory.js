// @flow
import getVersionContract from '../contracts/getVersionContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get subscription history of a manager by `managerAddress`
 */
const getSubscriptionHistory = async (
  environment,
  managerAddress: Address,
  startId: number = 0,
): Promise<any> => {
  const versionContract = await getVersionContract(environment);

  const subscriptionHistory = await versionContract.instance.getSubscriptionHistory.call(
    {},
    [managerAddress, startId],
  );

  return subscriptionHistory;
};

export default getSubscriptionHistory;
