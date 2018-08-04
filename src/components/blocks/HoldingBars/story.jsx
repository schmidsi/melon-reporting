import React from 'react';
import { storiesOf } from '@storybook/react';

import HoldingBars from '.';

import styles from './story.css';

const mockData = [
  { percentage: 0.5 },
  { percentage: 0.3 },
  { percentage: 0.2 },
];

storiesOf('HoldingBars', module).add('default', () => (
  <div className={styles.wrapper}>
    <HoldingBars allocations={mockData}>
      <div>ASDF</div>
      <div>QWER</div>
      <div>YXCV</div>
      <div>Fund</div>
    </HoldingBars>
  </div>
));
