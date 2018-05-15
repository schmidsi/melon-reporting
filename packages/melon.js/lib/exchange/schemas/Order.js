// @flow
import BigNumber from 'bignumber.js';

import type { BuyOrSell } from './BuyOrSell';

/**
 * Shape of a normalised order.
 * `cumulativeVolume` is only populated in the orderbook
 */
export type Order = {
  id: number,
  owner: string,
  isActive: boolean,
  sell: {
    symbol: string,
    howMuch: BigNumber,
  },
  buy: {
    symbol: string,
    howMuch: BigNumber,
  },
  price?: BigNumber,
  type?: BuyOrSell,
  cumulativeVolume?: BigNumber,
};

export type SerializedOrder = {
  id: number,
  owner: string,
  isActive: boolean,
  sell: {
    symbol: string,
    howMuch: string,
  },
  buy: {
    symbol: string,
    howMuch: string,
  },
  price?: string,
  type?: BuyOrSell,
  cumulativeVolume?: string,
};

export type RawOrder = [string, string, BigNumber, BigNumber];
