import { add } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';
import isSameToken from '~/api/queries/isSameToken';

const increaseHolding = (amount, token) =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: isSameToken(holding.token, token || data.meta.quoteToken)
        ? add(holding.quantity, amount)
        : holding.quantity,
    })),
  );

export default increaseHolding;
