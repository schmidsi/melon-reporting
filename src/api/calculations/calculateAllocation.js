import { divide, multiply } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const calculateAllocation = dayIndex =>
  setPath(['calculations', 'allocation'], ({ data, calculations }) =>
    data.holdings.map(holding => {
      const price = holding.priceHistory[dayIndex];
      const value = multiply(holding.quantity, price);

      return {
        token: holding.token,
        price,
        quantity: holding.quantity,
        value,
        percentage: divide(value, calculations.aum),
      };
    }),
  );

export default calculateAllocation;
