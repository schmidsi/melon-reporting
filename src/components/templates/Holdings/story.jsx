import React from 'react';
import * as R from 'ramda';
import { storiesOf } from '@storybook/react';

import exampleData from '../../../data/example-report-data.json';

import storyCss from './story.css';

import Holdings from './';

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
          // Nice to have: Refactor with xprod: R.splitEvery(l2.length, R.xprod(l1, l2))
          tokenCorrelation: exampleData.holdings.map((rowHolding, rowIndex) =>
            R.mergeAll(
              exampleData.holdings.map((colHolding, colIndex) =>
                R.cond([
                  [
                    () => colIndex > rowIndex,
                    () => ({ [colHolding.token.symbol]: '' }),
                  ],
                  [
                    () => colIndex === rowIndex,
                    () => ({ [colHolding.token.symbol]: '-' }),
                  ],
                  [
                    () => true,
                    () => ({
                      [colHolding.token.symbol]: (
                        Math.random() * 2 -
                        1
                      ).toFixed(2),
                    }),
                  ],
                ])(),
              ),
            ),
          ),
        }}
      />
    </div>
  </div>
));
