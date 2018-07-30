import * as R from 'ramda';

import calculateInvestors from './calculateInvestors';
import calculateAllocation from './calculateAllocation';
import calculateSharePrice from './calculateSharePrice';
import calculateTotalSupply from './calculateTotalSupply';
import calculateAum from './calculateAum';

const doHistoricCalculations = dayIndex =>
  R.compose(
    calculateInvestors(),
    calculateAllocation(dayIndex),
    calculateSharePrice(),
    calculateTotalSupply(),
    calculateAum(dayIndex),
  );

export default doHistoricCalculations;
