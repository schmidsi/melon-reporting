// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import getSymbol from '../../assets/utils/getSymbol';
import getConfig from '../../version/calls/getConfig';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Gets the quote asset of the current PriceFeed
 */
const getQuoteAssetSymbol = async (
  environment: Environment,
): Promise<TokenSymbol> => {
  const config = await getConfig(environment);
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const address = await canonicalPriceFeedContract.instance.getQuoteAsset.call();

  return getSymbol(config, address);
};

export default getQuoteAssetSymbol;
