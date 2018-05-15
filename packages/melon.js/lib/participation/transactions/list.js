// @flow
import ensure from '../../utils/generic/ensure';
import getComplianceContract from '../contracts/getComplianceContract';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../../assets/schemas/Address';

/**
 * List an investor as eligible
 */
const list = async (wallet, subscriber: Address): Promise<boolean> => {
  const participationContract = await getComplianceContract();
  const isListedBefore = await participationContract.avatar(subscriber);
  if (!isListedBefore) {
    const listReceipt = await sendTransaction(
      participationContract,
      'list',
      [subscriber],
      wallet,
    );
    const isListed = await participationContract.instance.avatar.call({}, [
      subscriber,
    ]);
    ensure(isListed, 'Listing failed', listReceipt);
  }

  return true;
};

export default list;
