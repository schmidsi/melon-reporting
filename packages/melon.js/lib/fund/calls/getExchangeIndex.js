// @flow
import type { Environment } from '../../utils/environment/Environment';
import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';
/**
 * Gets the index of an exchange on a specific fund
 * @throws If this exchange address is unknown to the fund
 */
const getExchangeIndex = async (
  environment: Environment,
  exchangeAddress: String,
  fundAddress: String,
) => {
  const fundContract = await getFundContract(environment, fundAddress);
  const fundExchanges = await fundContract.instance.getExchangeInfo.call(
    {},
    [],
  );
  // eslint-disable-next-line no-underscore-dangle
  const index = fundExchanges[0].findIndex(e => e._value === exchangeAddress);
  ensure(
    index !== -1,
    `Fund with address ${fundAddress} does not authorize exchange with address ${exchangeAddress}`,
  );

  return index;
};

export default getExchangeIndex;
