// @flow
import Utils from 'ethers-utils';
import getFundContract from '../contracts/getFundContract';
import toDate from '../../utils/generic/toDate';

import type { Address } from '../../assets/schemas/Address';

/**
 * General fund informations
 */
type FundInformations = {
  fundAddress: Address,
  owner: Address,
  name: string,
  decimals: number,
  inception: Date,
};

/**
 * Get general fund informations for fund at `fundAddress`
 */
const getFundInformations = async (
  environment,
  { fundAddress },
): Promise<FundInformations> => {
  const fundContract = getFundContract(environment, fundAddress);
  const nameInBytes = await fundContract.instance.getName.call();
  const name = Utils.toUtf8String(
    Utils.stripZeros(nameInBytes.reverse()).reverse(),
  );
  const decimals = (await fundContract.instance.getDecimals.call()).toNumber();
  const inception = await fundContract.instance.getCreationTime.call();
  const owner = await fundContract.instance.owner.call();
  const modules = await fundContract.instance.getModules.call();

  return {
    fundAddress,
    name,
    owner,
    decimals,
    inception: toDate(inception),
    modules,
  };
};

export default getFundInformations;
