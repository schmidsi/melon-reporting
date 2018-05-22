// @flow
import BigNumber from 'bignumber.js';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import toReadable from '../../assets/utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
const getPrice = async (
  environment: Environment,
  tokenSymbol: TokenSymbol,
): BigNumber => {
  const config = await getConfig(environment);
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const assetAddress = getAddress(config, tokenSymbol);

  const [price, ,] = await canonicalPriceFeedContract.instance.getPrice.call(
    {},
    [assetAddress],
  );

  return toReadable(config, price, config.quoteAssetSymbol);
};

export default getPrice;
