import * as R from 'ramda';

import setPath from '../../utils/setPath';
import pearsonCorrelation from '../utils/pearsonCorrelation';

const calcCorrelation = R.cond([
  [
    ({ rowIndex, colIndex }) => R.lt(rowIndex, colIndex),
    ({ symbol }) => ({ [symbol]: '' }),
  ],
  [
    R.T,
    ({ symbol, rowPriceHistory, colPriceHistory }) => ({
      [symbol]: pearsonCorrelation(rowPriceHistory, colPriceHistory).toFixed(2),
    }),
  ],
]);

const calculateTokenCorrelation = setPath(
  ['calculations', 'tokenCorrelation'],
  ({ data: { holdings }, calculationsHistory }) =>
    [
      ...holdings,
      {
        token: { symbol: 'Fund' },
        priceHistory: calculationsHistory.map(c => c.sharePrice),
      },
    ].map((rowHolding, rowIndex) =>
      R.mergeAll(
        holdings.map((colHolding, colIndex) =>
          calcCorrelation({
            rowIndex,
            colIndex,
            symbol: colHolding.token.symbol,
            rowPriceHistory: rowHolding.priceHistory,
            colPriceHistory: colHolding.priceHistory,
          }),
        ),
      ),
    ),
);

export default calculateTokenCorrelation;
