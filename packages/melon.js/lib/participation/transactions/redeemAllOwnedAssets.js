// @flow
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import toReadable from '../../assets/utils/toReadable';
import getParticipation from '../calls/getParticipation';
import toDate from '../../utils/generic/toDate';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Redeem `numShares` of fund at `fundAddress` by requesting `redeemAllOwnedAssets`
 */
const redeemAllOwnedAssets = async (
  environment: Environment,
  { fundAddress, numShares },
): Promise<Redemption> => {
  const config = await getConfig(environment);
  const fundContract = await getFundContract(environment, fundAddress);

  const participation = await getParticipation(environment, {
    fundAddress,
    investorAddress: environment.account.address,
  });

  ensure(
    participation.personalStake.gte(numShares),
    `You cannot redeem more shares than you have. You own ${
      participation.personalStake
    }`,
  );

  const args = [toProcessable(config, numShares, config.quoteAssetSymbol)];
  const receipt = await sendTransaction(
    fundContract,
    'redeemAllOwnedAssets',
    args,
    environment,
    {},
  );
  const redeemAllOwnedAssetsLogEntry = findEventInLog('Redeemed', receipt);
  const shareQuantity = redeemAllOwnedAssetsLogEntry.params.shareQuantity.value;

  ensure(
    shareQuantity.eq(toProcessable(config, numShares, config.quoteAssetSymbol)),
    'requested numShares is not equal to retrieved quantity',
    redeemAllOwnedAssetsLogEntry,
  );

  return {
    numShares: toReadable(config, shareQuantity, config.quoteAssetSymbol),
    timestamp: toDate(redeemAllOwnedAssetsLogEntry.params.atTimestamp.value),
  };
};

export default redeemAllOwnedAssets;
