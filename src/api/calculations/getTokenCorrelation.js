import * as R from 'ramda';

import pearsonCorrelation from './pearsonCorrelation';

const calcCorrelation = R.cond([
  [R.lt, (i, j, symbol) => ({ [symbol]: '' })],
  [
    R.T,
    (i, j, symbol, iPriceHistory, jPriceHistory) => ({
      [symbol]: pearsonCorrelation(iPriceHistory, jPriceHistory).toFixed(2),
    }),
  ],
]);

const getTokenCorrelation = (holdings, sharePriceHistory) =>
  [
    ...holdings,
    {
      token: { symbol: 'Fund' },
      priceHistory: sharePriceHistory,
    },
  ].map((rowHolding, rowIndex) =>
    R.mergeAll(
      holdings.map((colHolding, colIndex) =>
        calcCorrelation(
          rowIndex,
          colIndex,
          colHolding.token.symbol,
          rowHolding.priceHistory,
          colHolding.priceHistory,
        ),
      ),
    ),
  );

export default getTokenCorrelation;
