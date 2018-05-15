import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async (
  environment,
  {
    fundContract,
    referencePrice,
    takerAssetSymbol,
    makerAssetSymbol,
    fillTakerQuantity,
    fillMakerQuantity,
  },
) => {
  const config = await getConfig(environment);

  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const orderPrice = await canonicalPriceFeedContract.instance.getOrderPriceInfo.call(
    {},
    [
      getAddress(config, takerAssetSymbol),
      getAddress(config, makerAssetSymbol),
      toProcessable(config, fillTakerQuantity, takerAssetSymbol),
      toProcessable(config, fillMakerQuantity, makerAssetSymbol),
    ],
  );

  const riskManagementContract = await getRiskManagementContract(
    environment,
    fundContract,
  );

  const result = await riskManagementContract.instance.isTakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      getAddress(config, takerAssetSymbol),
      getAddress(config, makerAssetSymbol),
      toProcessable(config, fillTakerQuantity, takerAssetSymbol),
      toProcessable(config, fillMakerQuantity, makerAssetSymbol),
    ],
  );
  return result;
};

export default isTakePermitted;
