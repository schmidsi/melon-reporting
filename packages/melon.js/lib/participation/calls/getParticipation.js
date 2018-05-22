// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import toReadable from '../../assets/utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * The participation of an investor in fund
 */
type Participation = {
  personalStake: BigNumber,
  totalSupply: BigNumber,
};

/**
 * Get the personalStake and totalSupply of an `investorAddress` in a fund at
 * fundAddress
 */
const getParticipation = async (
  environment: Environment,
  { fundAddress, investorAddress },
): Promise<Participation> => {
  const config = await getConfig(environment);
  const fundContract = await getFundContract(environment, fundAddress);

  const personalStake = await fundContract.instance.balanceOf.call({}, [
    investorAddress,
  ]);
  const totalSupply = await fundContract.instance.totalSupply.call();

  return {
    personalStake: toReadable(config, personalStake, config.quoteAssetSymbol),
    totalSupply: toReadable(config, totalSupply, config.quoteAssetSymbol),
  };
};

export default getParticipation;
