// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getRegisteredAssets = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getRegisteredAssets.call({}, []);
};

export default getRegisteredAssets;
