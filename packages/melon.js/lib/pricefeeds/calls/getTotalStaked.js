// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getTotalStaked = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.totalStaked.call({}, []);
};

export default getTotalStaked;
