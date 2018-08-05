import * as R from 'ramda';

import calculateHoldingsChart from './calculateHoldingsChart';
import calculateProfit from './calculateProfit';
import calculateTokenCorrelation from './calculateTokenCorrelation';
import calculateVolatility from './calculateVolatility';
import calculateAuditedTimespans from './calculateAuditedTimespans';

const doFinalCalculations = R.compose(
  calculateHoldingsChart,
  calculateProfit,
  calculateTokenCorrelation,
  calculateVolatility,
  calculateAuditedTimespans,
);

export default doFinalCalculations;
