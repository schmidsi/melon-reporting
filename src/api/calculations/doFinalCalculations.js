import * as R from 'ramda';

import calculateProfit from './calculateProfit';
import calculateTokenCorrelation from './calculateTokenCorrelation';

const doFinalCalculations = R.compose(
  calculateProfit,
  calculateTokenCorrelation,
);

export default doFinalCalculations;
