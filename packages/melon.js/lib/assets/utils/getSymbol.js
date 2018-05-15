// @flow

import type { AssetConfig, Config } from '../../version/calls/getConfig';
import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

const getTokenInfoByAddress = (config: Config, address: string): AssetConfig =>
  config.assets.find(t => t.address.toLowerCase() === address.toLowerCase()) ||
  (() => {
    throw new Error(`No token found with address ${address}`);
  })();

/**
 * Gets the token symbol by its ERC20 `address`
 */
const getSymbol = (config: Config, address: Address): TokenSymbol =>
  getTokenInfoByAddress(config, address).symbol;

export default getSymbol;
