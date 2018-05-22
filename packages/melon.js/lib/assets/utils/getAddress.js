// @flow
import getTokenInfo from './getTokenInfo';

import type { Config } from '../../version/calls/getConfig';
import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Gets address of given `tokenSymbol`
 */
const getAddress = (config: Config, tokenSymbol: TokenSymbol): Address =>
  getTokenInfo(config, tokenSymbol).address.toLowerCase();

export default getAddress;
