// @flow
import BigNumber from 'bignumber.js';

import type { BuyOrSell } from './BuyOrSell';
import type { Address } from '../../assets/schemas/Address';

/**
 * An executed trade == a taken order
 */
export type Trade = {
  maker: Address,
  taker: Address,
  timeStamp: Date,
  price: BigNumber,
  type: BuyOrSell,
  quantity: BigNumber,
};
