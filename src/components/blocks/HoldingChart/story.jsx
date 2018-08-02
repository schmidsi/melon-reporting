import React from 'react';
import { storiesOf } from '@storybook/react';

import HoldingChart from '.';

import mockData from './mockData';

storiesOf('HoldingChart', module).add('default', () => (
  <HoldingChart data={mockData} />
));
