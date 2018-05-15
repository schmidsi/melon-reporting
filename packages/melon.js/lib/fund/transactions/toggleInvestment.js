// @flow
import sendTransaction from '../../utils/parity/sendTransaction';
import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';

const toggleInvestment = async (
  environment,
  { fundAddress },
): Promise<boolean> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const owner = await fundContract.instance.owner.call();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const preInvestmentAllowed = await fundContract.instance.isInvestAllowed.call();

  if (preInvestmentAllowed === true) {
    await sendTransaction(fundContract, 'disableInvestment', [], environment);
  } else if (preInvestmentAllowed === false) {
    await sendTransaction(fundContract, 'enableInvestment', [], environment);
  }

  const postInvestmentAllowed = await fundContract.instance.isInvestAllowed.call();

  ensure(
    preInvestmentAllowed !== postInvestmentAllowed,
    'Toggle investment was not successful',
  );
  return postInvestmentAllowed;
};

export default toggleInvestment;
