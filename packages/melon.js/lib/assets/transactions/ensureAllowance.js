// @flow
import BigNumber from 'bignumber.js';
import getAllowance from '../calls/getAllowance';
import approve from '../transactions/approve';

/**
 * Ensures that `spender` still has the allowance to spend `quantity` of tokens
 * with `sympol` of `owner`. If current allowance is below requested allowance,
 * only the difference is approved again.
 *
 * @returns the actual approved quantity
 */
const ensureAllowance = async (
  environment,
  { symbol, owner, spender, quantity },
): Promise<BigNumber> => {
  const current = await getAllowance(environment, { symbol, owner, spender });
  const missing: BigNumber = quantity.minus(current);
  const approved: boolean = await approve(
    symbol,
    spender,
    missing,
    environment,
    {},
  );
  return approved ? missing : new BigNumber(0);
};

export default ensureAllowance;
