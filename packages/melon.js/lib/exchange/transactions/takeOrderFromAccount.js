// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getOrder from '../calls/getOrder';
import getMatchingMarketContract from '../contracts/getMatchingMarketContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Cancel an order by `id`
 */
const takeOrderFromAccount = (
  environment: Environment,
  { id, maxTakeAmount },
): Promise<any> =>
  getOrder(environment, { id }).then(async order => {
    const config = await getConfig(environment);
    const simpleMarketContract = await getMatchingMarketContract(environment);
    const args = [
      order.id,
      toProcessable(config, maxTakeAmount, order.sell.symbol),
    ];

    const transaction = await sendTransaction(
      simpleMarketContract,
      'take',
      args,
      environment,
    );

    const takeLog = findEventInLog('LogTake', transaction);
    const takeOrder = await getOrder(environment, {
      id: takeLog.params.id.value,
    });

    return transaction
      ? {
          order: takeOrder,
        }
      : null;
  });

export default takeOrderFromAccount;
