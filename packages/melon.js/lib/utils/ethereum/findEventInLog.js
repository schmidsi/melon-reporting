// @flow
import ensure from '../generic/ensure';

/**
 * Searches the log of the `receipt` for a given event `nameOrIndex`
 * Possibility to add custom error `message` if event not found
 * @throws {EnsureError}
 * @returns found event
 */
const findEventInLog = (
  nameOrIndex: string | number,
  receipt: Object,
  message: string = 'No transaction logs found in receipt',
): any => {
  ensure(
    !!(receipt && receipt.logs && receipt.logs.length),
    'Transaction has no logs at all.',
    {
      nameOrIndex,
      receipt,
    },
  );

  const log =
    typeof nameOrIndex === 'string'
      ? receipt.logs.find(l => l.event === nameOrIndex)
      : receipt.logs[nameOrIndex];

  ensure(!!log, message, {
    nameOrIndex,
    receipt,
  });

  return log;
};

export default findEventInLog;
