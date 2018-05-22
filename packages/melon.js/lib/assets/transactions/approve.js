// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Approves `spender` to spend `quantity` of token with `symbol`
 * `from` given address
 *
 * @returns {true} if approval was succesfull
 */
const approve = async (
  environment: Environment,
  { symbol, spender, quantity },
): boolean => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, symbol);
  const args = [spender, toProcessable(config, quantity, symbol)];

  const receipt = await sendTransaction(
    tokenContract,
    'approve',
    args,
    environment,
  );
  const approvalLogEntry = findEventInLog('Approval', receipt);
  return !!approvalLogEntry;
};

export default approve;
