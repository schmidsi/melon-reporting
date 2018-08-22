import * as R from 'ramda';

import { multiply } from '~/utils/functionalBigNumber';
import setPath from '../../utils/setPath';

const calculateHoldingsChart = setPath(
  ['calculations', 'holdingsChart'],
  ({ calculationsHistory }) =>
    calculationsHistory.map(calc => ({
      sharePrice: calc.sharePrice,
      ...R.fromPairs(
        calc.allocation.map(holding => [
          holding.token.symbol,
          multiply(calc.sharePrice, holding.percentage),
        ]),
      ),
    })),
);

export default calculateHoldingsChart;
