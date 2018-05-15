// @flow
import getFundContract from '../contracts/getFundContract';

/**
 * Fund participation authorizations
 */
type ParticipationAuthorizations = {
  subscriptionAllowed: boolean,
  redemptionAllowed: boolean,
};

/**
 * Get participation authorizations of fund at `fundAddress`
 */
const getParticipationAuthorizations = async (
  environment,
  { fundAddress },
): Promise<ParticipationAuthorizations> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const subscriptionAllowed = await fundContract.instance.isInvestAllowed.call();
  const redemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  return {
    subscriptionAllowed,
    redemptionAllowed,
  };
};

export default getParticipationAuthorizations;
