// @flow
import getMatchingMarketContract from '../contracts/getMatchingMarketContract';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';

/**
 * Cancel an order by `id`
 */
const cancelOrderFromAccount = async (environment, { id }): boolean => {
  const simpleMarketContract = await getMatchingMarketContract(environment);

  // TODO: reintroduce rush
  // const receipt = await rush(
  //   boosted,
  //   `Cancelling order ${id} took more than 10 seconds.`,
  //   10 * 1000,
  // );
  const receipt = await sendTransaction(
    simpleMarketContract,
    'cancel',
    [id],
    environment,
    {},
  );
  const canceled = findEventInLog(
    'LogKill',
    receipt,
    'Error during order cancelation',
  );

  return !!canceled;
};

export default cancelOrderFromAccount;
