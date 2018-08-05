import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '../../../data/example-report-data.json';

import storyCss from './story.css';

import FactSheet from '.';

storiesOf('Templates|FactSheet', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <FactSheet
        data={exampleData}
        calculations={{
          sharePrice: 23.124,
          sharePriceHistory: exampleData.holdings[0].priceHistory,
          transactionFees: 83.214,
          volatility: 0.195,
          profit: 5.23,
        }}
      />
    </div>
  </div>
));
