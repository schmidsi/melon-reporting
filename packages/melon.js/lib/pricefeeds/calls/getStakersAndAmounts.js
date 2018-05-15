// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getStakersAndAmounts = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getStakersAndAmounts.call({}, []);
};

export default getStakersAndAmounts;
