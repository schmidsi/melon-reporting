// @flow
import TokenAbi from '@melonproject/smart-contracts/out/assets/PreminedAsset.abi.json';
import getConfig from '../../version/calls/getConfig';
import getAddress from '../utils/getAddress';

import type { Environment } from '../../utils/environment/Environment';

/**
 * @returns the contract instance of a token by symbol
 */
const getTokenContract: contract = async (environment: Environment, symbol) => {
  const config = await getConfig(environment);
  const tokenAddress = getAddress(config, symbol);
  return environment.api.newContract(TokenAbi, tokenAddress);
};

export default getTokenContract;
