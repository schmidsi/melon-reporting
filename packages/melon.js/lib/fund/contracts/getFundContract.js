// @flow
import FundAbi from '@melonproject/smart-contracts/out/version/Fund.abi.json';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get the contract instance of fund at `fundAddress`
 */
const getFundContract = (environment, fundAddress: Address) =>
  environment.api.newContract(FundAbi, fundAddress);
export default getFundContract;
