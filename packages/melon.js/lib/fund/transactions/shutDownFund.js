// @flow
import getVersionContract from '../../version/contracts/getVersionContract';
import ensure from '../../utils/generic/ensure';
import sendTransaction from '../../utils/parity/sendTransaction';

/**
 * Shut down fund at `fundAddress`
 */
const shutDownFund = async (environment, { fundAddress }): Promise<any> => {
  const versionContract = await getVersionContract(environment);

  const shutDownAllowed = await versionContract.instance.managerToFunds.call(
    {},
    [environment.account.address],
  );
  ensure(
    shutDownAllowed.toLowerCase() === fundAddress.toLowerCase(),
    'Not owner of fund',
  );

  const receipt = await sendTransaction(
    versionContract,
    'shutDownFund',
    [fundAddress],
    environment,
  );

  return receipt;
};

export default shutDownFund;
