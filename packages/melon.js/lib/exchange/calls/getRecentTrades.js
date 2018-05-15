// @flow
import Api from '@parity/api';
import BigNumber from 'bignumber.js';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getDecimals from '../../assets/utils/getDecimals';
import getMatchingMarketContract from '../contracts/getMatchingMarketContract';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';

import type { Trade } from '../schemas/Trade';
import type { Environment } from '../../utils/environment/Environment';

/**
 * get all recent trades for a given asset pair `baseTokenSymbol`/
 * `quoteTokenSymbol` in the `inlastXdays`
 */
const getRecentTrades = async (
  environment: Environment,
  { baseTokenSymbol, quoteTokenSymbol, inlastXdays = 1 },
): Promise<[Trade]> => {
  const config = await getConfig(environment);
  const simpleMarketContract = await getMatchingMarketContract(environment);

  const blocksPerDay = 21600;
  const numberOfDays = inlastXdays;

  const blockNumber = await environment.api.eth.blockNumber();

  const hashed = Api.util.sha3(
    'LogTake(bytes32,bytes32,address,address,address,address,uint128,uint128,uint64)',
  );
  const filter = {
    fromBlock: blockNumber.toNumber() - blocksPerDay * numberOfDays,
    toBlock: 'latest',
    address: simpleMarketContract.address,
    topics: [hashed],
  };
  const pastEvents = await environment.api.eth.getLogs(filter);
  const decodedLogs = simpleMarketContract.parseEventLogs(pastEvents);

  if (baseTokenSymbol && quoteTokenSymbol) {
    const baseTokenAddress = getAddress(config, baseTokenSymbol);
    const quoteTokenAddress = getAddress(config, quoteTokenSymbol);
    const decimalDifference =
      getDecimals(config, quoteTokenSymbol) -
      getDecimals(config, baseTokenSymbol);
    return decodedLogs
      .map(event => {
        const trade = {
          maker: event.params.maker.value,
          taker: event.params.taker.value,
          timestamp: toDate(event.params.timestamp.value),
          transactionHash: event.transactionHash,
        };
        if (
          event.params.buy_gem.value.toLowerCase() === quoteTokenAddress &&
          event.params.pay_gem.value.toLowerCase() === baseTokenAddress
        ) {
          if (getDecimals(config, baseTokenSymbol) !== 18) {
            trade.price = new BigNumber(event.params.give_amt.value)
              .div(event.params.take_amt.value)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.params.give_amt.value).div(
              event.params.take_amt.value,
            );
          }
          trade.type = 'buy';
          trade.quantity = toReadable(
            config,
            event.params.take_amt.value,
            baseTokenSymbol,
          );
        } else if (
          event.params.buy_gem.value.toLowerCase() === baseTokenAddress &&
          event.params.pay_gem.value.toLowerCase() === quoteTokenAddress
        ) {
          if (getDecimals(config, baseTokenSymbol) !== 18) {
            trade.price = new BigNumber(event.params.take_amt.value)
              .div(event.params.give_amt.value)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.params.take_amt.value).div(
              event.params.give_amt.value,
            );
          }
          trade.type = 'sell';
          trade.quantity = toReadable(
            config,
            event.params.give_amt.value,
            baseTokenSymbol,
          );
        } else {
          return null;
        }
        return trade;
      })
      .filter(o => !!o);
  }
  return decodedLogs;
};

export default getRecentTrades;
