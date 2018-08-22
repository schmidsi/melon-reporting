import * as R from 'ramda';

import { add, subtract } from '~/utils/functionalBigNumber';
import setPath from '../utils/setPath';
import isSameToken from '../queries/isSameToken';

const updateHoldings = ({ buyToken, buyHowMuch, sellToken, sellHowMuch }) =>
  setPath(['data', 'holdings'], ({ data }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: R.cond([
        [
          ({ buyToken }) => isSameToken(buyToken, holding.token),
          ({ buyHowMuch }) => add(holding.quantity, buyHowMuch),
        ],
        [
          ({ sellToken }) => isSameToken(sellToken, holding.token),
          ({ sellHowMuch }) => subtract(holding.quantity, sellHowMuch),
        ],
        [R.T, () => holding.quantity],
      ])({ buyToken, buyHowMuch, sellToken, sellHowMuch }),
    })),
  );

export default updateHoldings;
