// @flow
import getFundContract from '../contracts/getFundContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get all the subscribe/redeem requests this fund at `fundAddress` received so far
 */
const getRequestsHistory = async (fundAddress: Address): Promise<any> => {
  const fundContract = getFundContract(fundAddress);

  const requests = await fundContract.instance.requests.call();

  return requests;
};

export default getRequestsHistory;
