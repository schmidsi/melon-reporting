// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

const hasRecentPrice = async (
  environment: Environment,
  tokenSymbol: TokenSymbol,
): Promise<Boolean> => {
  const config = await getConfig(environment);
  const symbol = tokenSymbol || config.quoteAssetSymbol;
  const tokenAddress = getAddress(config, symbol);
  const dataFeedContract = await getCanonicalPriceFeedContract(environment);
  return dataFeedContract.instance.hasRecentPrice.call({}, [tokenAddress]);
};

export default hasRecentPrice;
