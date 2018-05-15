// @flow
import BigNumber from 'bignumber.js';

import getDecimals from './getDecimals';

import type { Config } from '../../version/calls/getConfig';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Takes a human readable `quantity` and makes it processable by EVM according
 * to the decimals specified by `tokenSymbol`.
 *
 * _Note_ that the EVM always consumes and returns BigNumbers.
 *
 * @example
 *  toProcessable(config, 0.1, 'ETH-T'));
 *  // --> BigNumber(100000000000000000) // (17 zeros)
 */
const toProcessable = (
  config: Config,
  quantity: number | BigNumber,
  tokenSymbol: TokenSymbol,
  shouldRound: Boolean = true,
): BigNumber => {
  const precision: number = getDecimals(config, tokenSymbol);
  if (shouldRound) {
    const roundedQuantity = new BigNumber(quantity).round(precision);
    return new BigNumber(roundedQuantity).times(10 ** precision);
  }
  return new BigNumber(quantity).times(10 ** precision); // this is a hack to handle 0x orders with more than 15 significant digits
};

export default toProcessable;
