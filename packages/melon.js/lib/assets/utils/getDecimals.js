// @flow
import getTokenInfo from './getTokenInfo';

import type { Config } from '../../version/calls/getConfig';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Gets decimals of given `tokenSymbol`
 */
const getDecimals = (config: Config, tokenSymbol: TokenSymbol): number =>
  getTokenInfo(config, tokenSymbol).decimals;

export default getDecimals;
