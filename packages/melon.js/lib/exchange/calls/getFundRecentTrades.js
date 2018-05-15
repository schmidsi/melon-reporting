// @flow
import BigNumber from 'bignumber.js';
import toReadable from '../../assets/utils/toReadable';
import getDecimals from '../../assets/utils/getDecimals';
import getSymbol from '../../assets/utils/getSymbol';
import getRecentTrades from './getRecentTrades';
import getConfig from '../../version/calls/getConfig';
import toDate from '../../utils/generic/toDate';

import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';
import type { Environment } from '../../utils/environment/Environment';

/**
 * @deprecated should be same as Trade
 */
type FundTrade = {
  maker: Address,
  taker: Address,
  timeStamp: Date,
  sellQuantity: BigNumber,
  buyQuantity: BigNumber,
  sellToken: TokenSymbol,
  buyToken: TokenSymbol,
};

/**
 * Get recent trades for `fundAddress` `inlastXdays`.
 */
const getFundRecentTrades = async (
  environment: Environment,
  { fundAddress, inlastXdays = 1 },
): Promise<[FundTrade]> => {
  const recentTrades = await getRecentTrades(environment, {
    baseTokenSymbol: undefined,
    quoteTokenSymbol: undefined,
    inlastXdays,
  });
  const config = await getConfig(environment);

  let trade;
  const arrayOfHashes = [];

  return recentTrades
    .map(event => {
      const maker = event.params.maker.value;
      const taker = event.params.taker.value;
      const giveAmount = event.params.give_amt.value;
      const takeAmount = event.params.take_amt.value;

      if (
        (maker === fundAddress || taker === fundAddress) &&
        arrayOfHashes.indexOf(event.transactionHash) === -1
      ) {
        arrayOfHashes.push(event.transactionHash);
        const buySymbol = getSymbol(
          config,
          event.params.pay_gem.value.toLowerCase(),
        );
        const sellSymbol = getSymbol(
          config,
          event.params.buy_gem.value.toLowerCase(),
        );

        trade = {
          maker,
          taker,
          timestamp: toDate(event.params.timestamp.value),
          sellQuantity: giveAmount,
          buyQuantity: takeAmount,
          sellToken: sellSymbol,
          buyToken: buySymbol,
          transactionHash: event.transactionHash,
        };

        // case BUY ORDER
        if (sellSymbol === config.quoteAssetSymbol) {
          const decimalDifference =
            getDecimals(config, sellSymbol) - getDecimals(config, buySymbol);

          if (getDecimals(config, buySymbol) !== 18) {
            trade.price = new BigNumber(giveAmount)
              .div(takeAmount)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(giveAmount).div(takeAmount);
          }
          trade.type = 'buy';
          trade.quantity = toReadable(config, takeAmount, buySymbol);
        } else if (buySymbol === config.quoteAssetSymbol) {
          const decimalDifference =
            getDecimals(config, buySymbol) - getDecimals(config, sellSymbol);

          if (getDecimals(config, sellSymbol) !== 18) {
            trade.price = new BigNumber(takeAmount)
              .div(giveAmount)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(takeAmount).div(giveAmount);
          }
          trade.type = 'sell';
          trade.quantity = toReadable(config, giveAmount, sellSymbol);
        } else {
          return null;
        }
        return trade;
      }
      return null;
    })
    .filter(o => !!o);
};

export default getFundRecentTrades;
