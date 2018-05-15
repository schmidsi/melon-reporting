// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Transfer `quantity` amount of tokens with symbol `symbol` from `from`
 * account to `toAddress`. In contrast to _transferFrom_, this function can
 * be called without approving the quantity/tokens first, if `from` can sign
 * the transaction (i.e. unlocked node or the account of logged in user)
 *
 * @throws {EnsureError}
 * @returns `true` if transfer is successful
 */
const transferTo = async (
  environment: Environment,
  { symbol, toAddress, quantity },
): boolean => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, symbol);
  const args = [toAddress, toProcessable(config, quantity, symbol), ''];
  const receipt = await sendTransaction(
    tokenContract,
    'transfer',
    args,
    environment,
    {},
  );
  const transferLogEntry = findEventInLog('Transfer', receipt);

  return !!transferLogEntry;
};

export default transferTo;
