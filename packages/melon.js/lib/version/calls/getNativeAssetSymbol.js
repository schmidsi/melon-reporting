// @flow
import getVersionContract from '../contracts/getVersionContract';
import getSymbol from '../../assets/utils/getSymbol';
import getConfig from '../../version/calls/getConfig';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Gets the native asset of the version
 */
const getNativeAssetSymbol = async (
  environment: Environment,
): Promise<TokenSymbol> => {
  const config = await getConfig(environment);
  const versionContract = await getVersionContract(environment);

  const address = await versionContract.instance.getNativeAsset.call();

  return getSymbol(config, address);
};

export default getNativeAssetSymbol;
