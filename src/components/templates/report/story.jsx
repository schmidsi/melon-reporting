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
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 1190,
        height: 1684,
        opacity: 0.5,
      }}
    />
    <div style={{ mixBlendMode: 'color-burn', margin: '-8px 107px' }}>
      <Report data={exampleData} />
    </div>
  </div>
));
