// @flow
import BigNumber from 'bignumber.js';

import getFundContract from '../../fund/contracts/getFundContract';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import toDate from '../../utils/generic/toDate';

import type { Address } from '../../assets/schemas/Address';
import type { Environment } from '../../utils/environment/Environment';
import type { RequestStatus } from '../constants/requestStatus';
import type { RequestType } from '../constants/requestTypes';

/**
 * The participation of an investor in fund
 */
type Request = {
  participant: Address,
  status: RequestStatus,
  totalSupply: BigNumber,
  type: RequestType,
  timestamp: date,
  atUpdateId: number,
  canBeExecutedInMs: number,
};

/**
 * Get's the last request and its estimated remaining wait time
 */
const getLastRequest = async (
  environment: Environment,
  { fundAddress },
): Promise<Request> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const priceFeedContract = await getPriceFeedContract(environment);

  const interval = (await priceFeedContract.instance.getInterval.call()).toNumber();

  const totalSupply = await fundContract.instance.totalSupply.call();
  const lastRequestId = await fundContract.instance.getLastRequestId.call();
  const [
    participant,
    status,
    type,
    ,
    ,
    ,
    ,
    timestamp,
    atUpdateId,
  ] = await fundContract.instance.requests.call({}, [lastRequestId]);

  /*
    // Corresponding code on protocol
    now >= add(requests[id].timestamp, module.pricefeed.getInterval()) &&
    module.pricefeed.getLastUpdateId() >= add(requests[id].atUpdateId, 2);
  */

  const maxRemainingWaitSeconds = totalSupply.eq(0) ? 0 : 2 * interval;

  const canBeExecutedInMs = Math.max(
    maxRemainingWaitSeconds * 1000 - (new Date() - toDate(timestamp)),
    0,
  );

  const request = {
    id: lastRequestId.toNumber(),
    participant,
    status: status.toNumber(),
    type: type.toNumber(),
    timestamp: toDate(timestamp),
    atUpdateId: atUpdateId.toNumber(),
    canBeExecutedInMs,
  };

  return request;
};

export default getLastRequest;
