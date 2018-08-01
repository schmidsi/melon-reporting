import { subtract, multiply, divide } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

/**
 * Redeem in slices: Remove the same proportion of every holding.
 * E.g. A fund has 2 ETH, 1 MLN, 10 shares and 1 share is redeemed:
 * The fund will have: 1.8 ETH, 0.9 MLN and 9 shares
 */
const decreaseHoldings = shares =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: subtract(
        holding.quantity,
        multiply(holding.quantity, divide(shares, calculations.totalSupply)),
      ),
    })),
  );

export default decreaseHoldings;
