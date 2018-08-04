import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditChart from '.';

import styles from './story.css';

import mockData from './mockData.js';

storiesOf('AuditChart', module).add('default', () => (
  <div className={styles.wrapper}>
    <AuditChart
      start={new Date(mockData.data.meta.timeSpanStart * 1000)}
      end={new Date(mockData.data.meta.timeSpanEnd * 1000)}
    >
      {mockData.data.audits}
    </AuditChart>
  </div>
));
