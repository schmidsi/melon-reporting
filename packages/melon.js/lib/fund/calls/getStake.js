// @flow
import BigNumber from 'bignumber.js';
import getFundContract from '../contracts/getFundContract';

import type { Address } from '../../assets/schemas/Address';

const getStake = async (fundAddress: Address): Promise<BigNumber> => {
  const fundContract = getFundContract(fundAddress);
  const stake = await fundContract.instance.getStake.call();

  return stake;
};

export default getStake;
