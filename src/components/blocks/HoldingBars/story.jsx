import React from 'react';
import { storiesOf } from '@storybook/react';

import HoldingBars from '.';

const mockData = [
  { percentage: 0.5 },
  { percentage: 0.3 },
  { percentage: 0.2 },
];

storiesOf('HoldingBars', module).add('default', () => (
  <div>
    <HoldingBars allocations={mockData}>
      <p>ASDF</p>
      <p>QWER</p>
      <p>YXCV</p>
      <p>Fund</p>
    </HoldingBars>
  </div>
));
