import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '~/data/example-report-data.json';

import Trades from './';

import storyCss from './story.css';

storiesOf('Templates|Trades', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <Trades data={exampleData} />
    </div>
  </div>
));
