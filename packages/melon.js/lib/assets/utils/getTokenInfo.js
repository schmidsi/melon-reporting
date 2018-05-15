// @flow
import type { AssetConfig, Config } from '../../version/calls/getConfig';

/**
 * Gets the token info by `tokenSymbol`
 * @throws If no token with given symbol is registered
 */
const getTokenInfo = (config: Config, tokenSymbol: string): AssetConfig =>
  config.assets.find(t => t.symbol === tokenSymbol.toUpperCase()) ||
  (() => {
    throw new Error(`No token found with symbol ${tokenSymbol}`);
  })();

export default getTokenInfo;
