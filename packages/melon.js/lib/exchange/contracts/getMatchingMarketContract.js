// @flow
import MatchingMarketAbi from '@melonproject/smart-contracts/out/exchange/thirdparty/MatchingMarket.abi.json';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Get deployed SimpleMarket contract instance
 */
const getMatchingMarketContract = async (environment: Environment) => {
  const config = await getConfig(environment);
  return environment.api.newContract(
    MatchingMarketAbi,
    config.matchingMarketAddress,
  );
};

export default getMatchingMarketContract;
