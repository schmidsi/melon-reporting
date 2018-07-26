import React from 'react';
import * as R from 'ramda';
import { storiesOf } from '@storybook/react';

import exampleData from '../../../data/example-report-data.json';

import storyCss from './story.css';

import Holdings from './';

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

const tokenCorrelation = [
  ...exampleData.holdings,
  { token: { symbol: 'Fund' } },
].map((rowHolding, rowIndex) =>
  R.mergeAll(
    exampleData.holdings.map((colHolding, colIndex) =>
      randomCorrelation(rowIndex, colIndex, colHolding.token.symbol),
    ),
  ),
);

// Nice to have: Refactor with xprod: R.splitEvery(l2.length, R.xprod(l1, l2))
// console.log(
//   R.splitEvery(
//     exampleData.holdings.length,
//     R.xprod(
//       exampleData.holdings.map((h, i) => ({ i })),
//       exampleData.holdings.map((h, j) => ({
//         j,
//         symbol: h.token.symbol,
//       })),
//     )
//       .map(R.mergeAll)
//       .map(({ i, j, symbol }) => randomCorrelation(i, j, symbol)),
//   ),
// );

storiesOf('Templates|Holdings', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <Holdings
        data={exampleData}
        calculations={{
          sharePrice: 23.124,
          sharePriceHistory: exampleData.holdings[0].priceHistory,
          transactionFees: 83.214,
          volatility: 19.5,
          profit: 5.23,
          tokenCorrelation,
        }}
      />
    </div>
  </div>
));
