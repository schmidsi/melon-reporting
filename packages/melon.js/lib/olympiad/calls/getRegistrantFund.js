// @flow
import getOlympiadContract from '../contracts/getOlympiadContract';

/**
 * @return Address of the fund registered by the registrant address
 */
const getRegistrantFund = async (environment): Promise<any> => {
  const olympiadContract = await getOlympiadContract(environment);

  const registrantFund = await olympiadContract.instance.getRegistrantFund.call(
    {},
    [environment.account.address],
  );
  return registrantFund;
};

export default getRegistrantFund;
