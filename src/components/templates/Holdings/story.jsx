import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '../../../data/example-report-data.json';

import storyCss from './story.css';

import Holdings from './';

storiesOf('Templates', module).add('Holdings', () => (
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
        }}
      />
    </div>
  </div>
));
