// @flow
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import getExchangeName from '../../exchange/utils/getExchangeName';
import getFundContract from '../contracts/getFundContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const cancelOrder = async (
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    makerAssetSymbol,
    takerAssetSymbol,
    identifier,
  },
): Promise<Order> => {
  const fundContract = await getFundContract(environment, fundAddress);

  const isShutDown = await fundContract.instance.isShutDown.call();
  const owner = await fundContract.instance.owner.call();
  const orderExpired = await fundContract.instance.orderExpired.call({}, [
    exchangeAddress,
    makerAssetSymbol,
  ]);
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase() ||
      isShutDown ||
      orderExpired,
    'Order can only be canceled by the owner of the fund, unless the order has expired or the fund has been shut down.',
  );

  const method = await getMethodNameSignature(environment, 'cancelOrder');

  const cancelLog = await callOnExchange(environment, {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: ['0x0', '0x0', makerAssetSymbol, takerAssetSymbol, '0x0'],
    orderValues: [0, 0, 0, 0, 0, 0, 0],
    identifier,
    signature: {},
  });

  return {
    id: parseInt(
      environment.api.util.bytesToHex(cancelLog.params.orderId.value),
      16,
    ),
    exchange: await getExchangeName(
      environment,
      cancelLog.params.exchange.value,
    ),
    updateType: 'cancel',
  };
};

export default cancelOrder;
