// @flow
import getCanonicalPriceFeedContract from '../../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';

const setupPriceFeed = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const receipt = await sendTransaction(
    canonicalPriceFeedContract,
    'setupStakingPriceFeed',
    [],
    environment,
  );

  const setupLog = receipt.logs.find(
    e => e.topics[0] === environment.api.util.sha3('SetupPriceFeed(address)'),
  );

  const stakingFeedAddress = environment.api.util.toChecksumAddress(
    `0x${setupLog.data.slice(-40)}`,
  );
  return stakingFeedAddress;
};

export default setupPriceFeed;
