// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getTokenContract from '../contracts/getTokenContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Transfers `quantity` amount of token with `symbol` from `fromAddress` to
 * `toAddress`
 *
 * @throws {EnsureError}
 * @returns `true` if successful, otherwise it throws
 */
const transferFrom = async (
  environment: Environment,
  { symbol, toAddress, quantity },
): Promise<boolean> => {
  const config = await getConfig(environment);
  const tokenContract = await getTokenContract(environment, symbol);
  const fromAddress = environment.account.address;
  const args = [
    fromAddress,
    toAddress,
    toProcessable(config, quantity, symbol),
  ];
  const receipt = await sendTransaction(
    tokenContract,
    'transferFrom',
    args,
    environment,
  );
  const transferLogEntry = findEventInLog('Transfer', receipt);
  return !!transferLogEntry;
};

export default transferFrom;
