// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import getExchangeIndex from '../calls/getExchangeIndex';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const callOnExchange = async (
  environment: Environment,
  {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: [maker, taker, makerAsset, takerAsset, feeRecipient],
    orderValues: [
      makerQuantity,
      takerQuantity,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
      dexySignatureMode = 0,
    ],
    identifier = 0,
    signature,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const exchangeIndex = await getExchangeIndex(
    environment,
    exchangeAddress,
    fundContract.address,
  );

  const v = signature.v ? signature.v : 0;
  const r = signature.r ? signature.r : '0x0';
  const s = signature.s ? signature.s : '0x0';

  const args = [
    exchangeIndex,
    method,
    [
      maker,
      taker,
      getAddress(config, makerAsset),
      getAddress(config, takerAsset),
      feeRecipient,
    ],
    [
      toProcessable(config, makerQuantity, makerAsset, false),
      toProcessable(config, takerQuantity, takerAsset, false),
      makerFee,
      takerFee,
      timestamp,
      salt,
      toProcessable(config, fillTakerTokenAmount, takerAsset, false),
      dexySignatureMode,
    ],
    `0x${Number(identifier)
      .toString(16)
      .padStart(64, '0')}`,
    v,
    r,
    s,
  ];
  const receipt = await sendTransaction(
    fundContract,
    'callOnExchange',
    args,
    environment,
    {},
  );
  const updateLog = findEventInLog('OrderUpdated', receipt);
  return updateLog;
};

export default callOnExchange;
