import * as R from 'ramda';

// (i, j, symbol)
const randomCorrelation = R.cond([
  [R.lt, (i, j, symbol) => ({ [symbol]: '' })],
  [R.equals, (i, j, symbol) => ({ [symbol]: '1' })],
  [
    R.T,
    (i, j, symbol) => ({
      [symbol]: (Math.random() * 2 - 1).toFixed(2),
    }),
  ],
]);

const getRandomCorrelation = holdings =>
  [...holdings, { token: { symbol: 'Fund' } }].map((rowHolding, rowIndex) =>
    R.mergeAll(
      holdings.map((colHolding, colIndex) =>
        randomCorrelation(rowIndex, colIndex, colHolding.token.symbol),
      ),
    ),
  );

export default getRandomCorrelation;
