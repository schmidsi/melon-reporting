// @flow
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import ensure from '../../utils/generic/ensure';
import getAddress from '../../assets/utils/getAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import isTakePermitted from '../../riskManagement/calls/isTakePermitted';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const preflightTakeOrder = async (
  environment: Environment,
  {
    fundContract,
    exchangeAddress,
    makerAssetSymbol,
    takerAssetSymbol,
    fillMakerQuantity,
    fillTakerQuantity,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const sellTokenBalance = await getBalance(environment, {
    tokenSymbol: takerAssetSymbol,
    ofAddress: fundContract.address,
  });
  ensure(
    sellTokenBalance.gte(fillTakerQuantity),
    `Insufficient balance of ${takerAssetSymbol}`,
  );

  const owner = await fundContract.instance.owner.call();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  const method = await getMethodNameSignature(environment, 'takeOrder');
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const isExchangeMethodAllowed = await canonicalPriceFeedContract.instance.exchangeMethodIsAllowed.call(
    {},
    [exchangeAddress, method],
  );
  ensure(isExchangeMethodAllowed, 'This exchange method is not allowed');

  ensure(
    getAddress(config, makerAssetSymbol) !== fundContract.address &&
      getAddress(config, takerAssetSymbol) !== fundContract.address,
    'Fund buying/selling its own fund token is forbidden.',
  );

  const ExistsPriceOnAssetPair = await canonicalPriceFeedContract.instance.existsPriceOnAssetPair.call(
    {},
    [
      getAddress(config, takerAssetSymbol),
      getAddress(config, makerAssetSymbol),
    ],
  );
  ensure(
    ExistsPriceOnAssetPair,
    'Price not provided on this asset pair by your datafeed.',
  );

  const [
    isRecent,
    referencePrice,
  ] = await canonicalPriceFeedContract.instance.getReferencePriceInfo.call({}, [
    getAddress(config, takerAssetSymbol),
    getAddress(config, makerAssetSymbol),
  ]);

  const isAllowed = await isTakePermitted(environment, {
    fundContract,
    referencePrice,
    takerAssetSymbol,
    makerAssetSymbol,
    fillTakerQuantity,
    fillMakerQuantity,
  });

  ensure(isAllowed, 'Risk Management module does not allow this trade.');

  ensure(isRecent, 'Pricefeed data is outdated :( Please try again.');

  if (exchangeAddress === config.matchingMarketAddress) {
    // pre conditions if OasisDex
    const exchangeContract = await getMatchingMarketContract(environment);

    // eslint-disable-next-line no-underscore-dangle
    const dust = await exchangeContract.instance._dust.call({}, [
      getAddress(config, takerAssetSymbol),
    ]);
    /* eslint-enable */
    ensure(
      toProcessable(config, fillTakerQuantity, takerAssetSymbol).gte(dust),
      'Selling quantity too low.',
    );
  } else if (exchangeAddress === config.zeroExV1Address) {
    // pre conditions if ZeroExV1
    // TODO: implement when ZeroExv2 is live
  }

  return true;
};

export default preflightTakeOrder;
