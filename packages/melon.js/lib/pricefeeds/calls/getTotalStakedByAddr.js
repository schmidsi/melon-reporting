// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const getTotalStakedByAddr = async (environment, { addr }): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.totalStakedFor.call({}, [addr]);
};

export default getTotalStakedByAddr;
