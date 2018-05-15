// @flow
import sendTransaction from '../../utils/parity/sendTransaction';
import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';

/**
 * Toggles redemption of fund at `fundAddress`
 */
const toggleRedemption = async (
  environment,
  { fundAddress },
): Promise<boolean> => {
  const fundContract = await getFundContract(environment, fundAddress);

  const owner = await fundContract.instance.owner.call();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const preRedemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  if (preRedemptionAllowed === true) {
    await sendTransaction(fundContract, 'disableRedemption', [], environment);
  } else if (preRedemptionAllowed === false) {
    await sendTransaction(fundContract, 'enableRedemption', [], environment);
  }

  const postRedemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  ensure(
    preRedemptionAllowed !== postRedemptionAllowed,
    'Toggle redemption was not successful',
  );
  return postRedemptionAllowed;
};

export default toggleRedemption;
