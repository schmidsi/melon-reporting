// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getNextEpochTime = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getNextEpochTime.call({}, []);
};

export default getNextEpochTime;
