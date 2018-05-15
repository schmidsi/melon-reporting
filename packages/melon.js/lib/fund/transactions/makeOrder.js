// @flow
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import getFundContract from '../contracts/getFundContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import preflightMakeOrder from '../preflights/preflightMakeOrder';
import getExchangeName from '../../exchange/utils/getExchangeName';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const makeOrder = async (
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    maker,
    taker = '0x0',
    makerAssetSymbol,
    takerAssetSymbol,
    feeRecipient = '0x0',
    makerQuantity,
    takerQuantity,
    makerFee = 0,
    takerFee = 0,
    timestamp = 0,
    salt = '0x0',
    fillTakerTokenAmount = 0,
    dexySignatureMode = 0,
    identifier = '0x0',
    signature = {},
  },
): Promise<Order> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const preflightCheck = await preflightMakeOrder(environment, {
    fundContract,
    exchangeAddress,
    makerAssetSymbol,
    takerAssetSymbol,
    makerQuantity,
    takerQuantity,
  });

  ensure(
    preflightCheck,
    'One of the pre-conditions of the function makeOrder failed on pre-flight.',
  );

  const method = await getMethodNameSignature(environment, 'makeOrder');

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
      fillTakerTokenAmount,
      dexySignatureMode,
    ],
    identifier,
    signature,
  });

  return {
    id: parseInt(
      environment.api.util.bytesToHex(updateLog.params.orderId.value),
      16,
    ),
    exchange: await getExchangeName(
      environment,
      updateLog.params.exchange.value,
    ),
    updateType: updateLog.params.updateType.value === 0 ? 'make' : 'take',
  };
};

export default makeOrder;
