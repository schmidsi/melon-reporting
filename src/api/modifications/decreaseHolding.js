import { subtract } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';
import isSameToken from '~/api/queries/isSameToken';

const decreaseHolding = (amount, token) =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: isSameToken(holding.token, token || data.meta.quoteToken)
        ? subtract(holding.quantity, amount)
        : holding.quantity,
    })),
  );

export default decreaseHolding;
