// @flow
import BigNumber from 'bignumber.js';

import approve from '../../assets/transactions/approve';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import isInvestmentRequestPermittedAndAllowed from '../calls/isInvestmentRequestPermittedAndAllowed';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';

import type { Environment } from '../../utils/environment/Environment';

type Subscription = {
  numShares: BigNumber,
  timestamp: Date,
  id: number,
};

/**
 * Subscribe to fund at `fundAddress` by offering `offeredValue` and requesting
 * `numShares` and incentivice execution with `incentiveValue`
 */
const invest = async (
  environment: Environment,
  { fundAddress, numShares, offeredValue, isNativeAsset = false },
): Promise<Subscription> => {
  const config = await getConfig(environment);
  const who = environment.account.address;
  const fundContract = await getFundContract(environment, fundAddress);

  const symbol = isNativeAsset ? config.nativeAssetSymbol : 'MLN-T';

  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const balance = await getBalance(environment, {
    tokenSymbol: symbol,
    ofAddress: who,
  });

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');
  await isInvestmentRequestPermittedAndAllowed(environment, {
    fundContract,
    asset: getAddress(config, symbol),
  });

  ensure(
    balance.gte(offeredValue),
    `Insufficent ${symbol}. Need ${offeredValue.toString()} have: ${balance.toString()}`,
  );

  const hasRecentPrice = await canonicalPriceFeedContract.instance.hasRecentPrice.call(
    {},
    [getAddress(config, symbol)],
  );
  ensure(
    hasRecentPrice,
    'Pricefeed data is not valid at the moment. Please try again later.',
  );

  await approve(environment, {
    symbol,
    spender: fundAddress,
    quantity: offeredValue,
  });

  const args = [
    toProcessable(config, offeredValue, symbol),
    toProcessable(config, numShares, symbol),
    getAddress(config, symbol),
  ];

  const receipt = await sendTransaction(
    fundContract,
    'requestInvestment',
    args,
    environment,
  );
  const investRequestLogEntry = findEventInLog('RequestUpdated', receipt);
  const request = await fundContract.instance.requests.call({}, [
    investRequestLogEntry.params.id.value,
  ]);
  const [, , , , numSharesCreated, , , timestamp] = request;

  return {
    id: investRequestLogEntry.params.id.value,
    numShares: toReadable(config, numSharesCreated, symbol),
    timestamp: toDate(timestamp),
  };
};

export default invest;
