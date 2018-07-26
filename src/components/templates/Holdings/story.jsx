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

const sharePrice = [10, 12, 15, 12, 18, 17, 20];

const percentage = {
  MLN: [0.4, 0.4, 0.5, 0.5, 0.6, 0.5, 0.5],
  ETH: [0.2, 0.3, 0.3, 0.2, 0.3, 0.2, 0.2],
  MKR: [0.3, 0.2, 0.1, 0.2, 0.1, 0.1, 0.2],
  ZRX: [0.1, 0.1, 0.1, 0.1, 0.0, 0.2, 0.1],
};

const effective = R.fromPairs(
  R.toPairs(percentage).map(([symbol, history]) => [
    symbol,
    R.zipWith(R.multiply, sharePrice, history),
  ]),
);

const labelArray = (label, array) => array.map(item => ({ [label]: item }));

const holdingChartData = R.toPairs(effective).reduce(
  (carry, [key, value]) => R.zipWith(R.merge, carry, labelArray(key, value)),
  labelArray('sharePrice', sharePrice),
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
          holdingChartData,
        }}
      />
    </div>
  </div>
));
