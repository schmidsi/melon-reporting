import SimpleAdapterAbi from '@melonproject/smart-contracts/out/exchange/adapter/SimpleAdapter.abi.json';

import getConfig from '../../version/calls/getConfig';

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async environment => {
  const config = await getConfig(environment);

  return environment.api.newContract(
    SimpleAdapterAbi,
    config.exchangeAdapterAddress,
  );
};

export default getExchangeAdapterContract;
