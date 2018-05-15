// @flow
import SolidityEvent from 'web3/lib/web3/event';

/**
 * Parse a raw `event` from the blockchain with the given `abi`
 */
const parseEvent = (event: any, abi: any): any => {
  const decoder = new SolidityEvent(null, abi, null);
  return decoder.decode(event).args;
};

export default parseEvent;
