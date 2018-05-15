// @flow
import BigNumber from 'bignumber.js';

import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';
import toDate from '../../utils/generic/toDate';

type RewardsConverted = {
  timestamp: BigNumber,
  shareQuantity: BigNumber,
  unclaimedFees: BigNumber,
};

/**
 * Convert unclaimed fees of `fundAddress`
 */
const calcSharePriceAndConvertFees = async (
  environment,
  { fundAddress },
): Promise<RewardsConverted> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');
  const owner = await fundContract.owner();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const receipt = await sendTransaction(
    fundContract,
    'calcSharePriceAndConvertFees',
    [],
    environment,
  );

  const updateLog = findEventInLog('FeesConverted', receipt);
  const feesConvertedArgs = updateLog.params;

  return {
    date: toDate(feesConvertedArgs.timestamp.value),
    shareQuantity: feesConvertedArgs.shareQuantity.value,
    unclaimedFees: feesConvertedArgs.unclaimedFees.value,
  };
};

export default calcSharePriceAndConvertFees;
