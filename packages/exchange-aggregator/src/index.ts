import BigNumber from 'bignumber.js';

export type OrderTypeEnum = 'sell' | 'buy';

// @TODO: Properly define the order type.
export interface Order {
  id: string;
  price: BigNumber;
  type: OrderTypeEnum;
  buy: {
    howMuch: BigNumber;
  };
  sell: {
    howMuch: BigNumber;
  };
}

export interface OrderWithCumulativeVolume extends Order {
  cumulativeVolume: BigNumber;
}

export type ExchangeEnum = 'RADAR_RELAY' | 'OASIS_DEX' | 'ERC_DEX';

export {
  default as getAggregatedObservable,
} from './orderbooks/getAggregatedObservable';
