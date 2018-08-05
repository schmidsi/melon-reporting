import React from 'react';
import { storiesOf } from '@storybook/react';

import HoldingBars from '.';

import styles from './story.css';

const mockData = [
  { percentage: 0.5, token: { symbol: 'ASDF' } },
  { percentage: 0.3, token: { symbol: 'QWER' } },
  { percentage: 0.2, token: { symbol: 'YCXV' } },
];

storiesOf('HoldingBars', module).add('default', () => (
  <div className={styles.wrapper}>
    <HoldingBars allocation={mockData}>
      <div>
        <strong>Title</strong>
      </div>
      <div>ASDF</div>
      <div>QWER</div>
      <div>YXCV</div>
      <div>Fund</div>
    </HoldingBars>
  </div>
));
