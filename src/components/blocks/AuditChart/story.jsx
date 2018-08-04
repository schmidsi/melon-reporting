import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditChart from '.';

import styles from './story.css';

import mockData from './mockData';

storiesOf('AuditChart', module).add('default', () => (
  <div className={styles.wrapper}>
    <AuditChart
      start={new Date(mockData.data.meta.timeSpanStart * 1000)}
      end={new Date(mockData.data.meta.timeSpanEnd * 1000)}
      greenTimeSpans={[
        {
          from: new Date(2018, 0, 1),
          to: new Date(2018, 3, 25),
        },
        {
          from: new Date(2018, 3, 26),
          to: new Date(2018, 5, 20),
        },
      ]}
      redTimeSpans={[
        {
          from: new Date(2018, 3, 25),
          to: new Date(2018, 3, 26),
        },
      ]}
    >
      {mockData.data.audits}
    </AuditChart>
  </div>
));
