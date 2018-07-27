import React from 'react';
import * as R from 'ramda';
import { storiesOf } from '@storybook/react';

import HoldingChart from './';

import mockData from './mockData';

storiesOf('HoldingChart', module).add('default', () => (
  <HoldingChart data={mockData} />
));
