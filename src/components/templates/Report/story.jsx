import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '../../../data/example-report-data.json';

import Report from './';

storiesOf('Templates', module).add('factsheet', () => (
  <div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: 'url(./01-factsheet@2x.png)',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 1190,
        height: 1684,
        opacity: 0.5,
      }}
    />
    <div
      style={{
        mixBlendMode: 'color-burn',
        position: 'relative',
        top: -8,
        left: -8,
      }}
    >
      <Report
        data={exampleData}
        calculations={{
          sharePrice: 23.124,
          transactionFees: 83.214,
          volatility: 19.5,
        }}
      />
    </div>
  </div>
));
