// @flow
import getFundContract from '../contracts/getFundContract';

/**
 * Checks if fund at `fundAddress` is shutdown
 */
const isShutDown = async (environment, { fundAddress }): Promise<boolean> => {
  const fundContract = getFundContract(environment, fundAddress);

  const bool = await fundContract.instance.isShutDown.call();

  return bool;
};

export default isShutDown;
