import * as R from 'ramda';

import calculateHoldingsChart from './calculateHoldingsChart';
import calculateProfit from './calculateProfit';
import calculateTokenCorrelation from './calculateTokenCorrelation';

const doFinalCalculations = R.compose(
  calculateHoldingsChart,
  calculateProfit,
  calculateTokenCorrelation,
);

export default doFinalCalculations;
