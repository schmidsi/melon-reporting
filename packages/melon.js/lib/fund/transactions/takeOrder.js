// @flow
import Utils from 'ethers-utils';
import BigNumber from 'bignumber.js';
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import getFundContract from '../contracts/getFundContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import preflightTakeOrder from '../preflights/preflightTakeOrder';
import getExchangeName from '../../exchange/utils/getExchangeName';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const takeOrder = async (
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    maker,
    taker,
    makerAssetSymbol,
    takerAssetSymbol,
    feeRecipient,
    makerQuantity,
    takerQuantity,
    makerFee,
    takerFee,
    timestamp,
    salt,
    fillTakerTokenAmount,
    dexySignatureMode = 0,
    identifier = '0x0',
    signature = {},
  },
): Promise<Order> => {
  const fillTakerQuantity =
    !fillTakerTokenAmount ||
    new BigNumber(fillTakerTokenAmount).gte(takerQuantity)
      ? new BigNumber(takerQuantity)
      : new BigNumber(fillTakerTokenAmount);

  const fillMakerQuantity = fillTakerQuantity
    .times(new BigNumber(makerQuantity))
    .div(new BigNumber(takerQuantity));

  ensure(
    fillMakerQuantity.lte(makerQuantity),
    'Quantity asked too high compared to quantity for sale on the order.',
  );

  //TODO: add ensure ZeroEx.isOrderValid

  const fundContract = await getFundContract(environment, fundAddress);
  const preflightCheck = await preflightTakeOrder(environment, {
    fundContract,
    exchangeAddress,
    makerAssetSymbol,
    takerAssetSymbol,
    fillMakerQuantity,
    fillTakerQuantity,
  });

  ensure(
    preflightCheck,
    'One of the pre-conditions of the function takeOrder failed on pre-flight.',
  );

  const method = await getMethodNameSignature(environment, 'takeOrder');

  const updateLog = await callOnExchange(environment, {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: [
      maker,
      taker,
      makerAssetSymbol,
      takerAssetSymbol,
      feeRecipient,
    ],
    orderValues: [
      makerQuantity,
      takerQuantity,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerQuantity,
      dexySignatureMode,
    ],
    identifier,
    signature,
  });
  console.log(updateLog);

  return {
    id: Utils.toUtf8String(
      Utils.stripZeros(updateLog.params.orderId.value.reverse()).reverse(),
    ),
    exchange: getExchangeName(environment, updateLog.params.exchange.value),
    updateType: updateLog.params.updateType.value === 0 ? 'make' : 'take',
  };
};

export default takeOrder;
