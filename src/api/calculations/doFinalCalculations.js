import * as R from 'ramda';

import calculateProfit from './calculateProfit';

const doFinalCalculations = R.compose(calculateProfit);

export default doFinalCalculations;
