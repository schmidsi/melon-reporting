// @flow
import getStakingPriceFeedContract from '../contracts/getStakingPriceFeedContract';

/**
 * Stake `quantity` on staking pricefeed contract
 */
const getStakingPriceFeedOwner = async (environment, address): Promise<any> => {
  const stakingPricefeedContract = await getStakingPriceFeedContract(
    environment,
    address,
  );

  return stakingPricefeedContract.instance.owner.call({}, []);
};

export default getStakingPriceFeedOwner;
