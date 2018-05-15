// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getPriceFeedsByOwner = async (environment, address): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getPriceFeedsByOwner.call({}, [
    address,
  ]);
};

export default getPriceFeedsByOwner;
