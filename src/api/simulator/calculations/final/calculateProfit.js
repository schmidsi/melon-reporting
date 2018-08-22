import * as R from 'ramda';
import setPath from '../../utils/setPath';
import { subtract, divide } from '~/utils/functionalBigNumber';

const calculateProfit = setPath(
  ['calculations', 'profit'],
  ({ calculationsHistory }) => {
    const head = R.head(calculationsHistory).sharePrice;
    const last = R.last(calculationsHistory).sharePrice;

    return divide(subtract(last, head), head);
  },
);

export default calculateProfit;
