import { add, multiply } from '~/utils/functionalBigNumber';
import setPath from '../utils/setPath';

const calculateAum = dayIndex =>
  setPath(['calculations', 'aum'], ({ data }) =>
    data.holdings.reduce(
      (carry, holding) =>
        add(carry, multiply(holding.quantity, holding.priceHistory[dayIndex])),
      '0',
    ),
  );

export default calculateAum;
