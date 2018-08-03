import React from 'react';
import { storiesOf } from '@storybook/react';

import InvestorChart from '.';

import mockData from './mockData';

storiesOf('InvestorChart', module).add('default', () => (
  <InvestorChart {...mockData} />
));
