import React from 'react';
import { storiesOf } from '@storybook/react';

import holdingsChart from '~/components/blocks/HoldingChart/mockData';
import getRandomCorrelation from './getRandomCorrelation';
import exampleData from '~/data/example-report-data.json';

import Holdings from '.';

import storyCss from './story.css';

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
          tokenCorrelation: getRandomCorrelation(exampleData.holdings),
          holdingsChart,
        }}
      />
    </div>
  </div>
));
