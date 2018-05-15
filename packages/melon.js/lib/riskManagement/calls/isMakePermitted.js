import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

/**
 * Test if make order request is permitted
 */
const isMakePermitted = async (
  environment,
  {
    referencePrice,
    makerAssetSymbol,
    takerAssetSymbol,
    makerQuantity,
    takerQuantity,
    fundContract,
  },
) => {
  const config = await getConfig(environment);
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const orderPrice = await canonicalPriceFeedContract.instance.getOrderPriceInfo.call(
    {},
    [
      getAddress(config, makerAssetSymbol),
      getAddress(config, takerAssetSymbol),
      toProcessable(config, makerQuantity, makerAssetSymbol),
      toProcessable(config, takerQuantity, takerAssetSymbol),
    ],
  );

  const riskManagementContract = await getRiskManagementContract(
    environment,
    fundContract,
  );

  const result = await riskManagementContract.instance.isMakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      getAddress(config, makerAssetSymbol),
      getAddress(config, takerAssetSymbol),
      toProcessable(config, makerQuantity, makerAssetSymbol),
      toProcessable(config, takerQuantity, takerAssetSymbol),
    ],
  );

  return result;
};

export default isMakePermitted;
