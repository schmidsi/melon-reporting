import { add } from '~/utils/functionalBigNumber';
import setPath from '../utils/setPath';
import isSameToken from '../queries/isSameToken';

const increaseHolding = (amount, token) =>
  setPath(['data', 'holdings'], ({ data }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: isSameToken(holding.token, token || data.meta.quoteToken)
        ? add(holding.quantity, amount)
        : holding.quantity,
    })),
  );

export default increaseHolding;
