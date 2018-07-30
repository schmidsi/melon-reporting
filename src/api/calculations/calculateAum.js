import { add, multiply } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const calculateAum = dayIndex =>
  setPath(['calculations', 'aum'], ({ data, calculations }) =>
    data.holdings.reduce(
      (carry, holding) =>
        add(carry, multiply(holding.quantity, holding.priceHistory[dayIndex])),
      '0',
    ),
  );

export default calculateAum;
