import * as R from 'ramda';

import calculateHoldingsChart from './calculateHoldingsChart';
import calculateProfit from './calculateProfit';
import calculateTokenCorrelation from './calculateTokenCorrelation';
import calculateVolatility from './calculateVolatility';

const doFinalCalculations = R.compose(
  calculateHoldingsChart,
  calculateProfit,
  calculateTokenCorrelation,
  calculateVolatility,
);

export default doFinalCalculations;
