import * as R from 'ramda';

import {
  divide,
  multiply,
  subtract,
  isZero,
} from '~/utils/functionalBigNumber';
import setPath from '../../utils/setPath';

const calcPercentage = (start, end) => divide(subtract(end, start), start);

const calculateAllocation = dayIndex =>
  setPath(['calculations', 'allocation'], ({ data, calculations }) =>
    data.holdings.map(holding => {
      const price = holding.priceHistory[dayIndex];
      const value = multiply(holding.quantity, price);

      return {
        token: holding.token,
        price,
        change: calcPercentage(R.head(holding.priceHistory), price),
        quantity: holding.quantity,
        value,
        percentage: isZero(calculations.aum)
          ? '0'
          : divide(value, calculations.aum),
      };
    }),
  );

export default calculateAllocation;
