import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditChart from '.';

import { toTimestamp } from '~/utils/timestamp';

import styles from './story.css';

import mockData from './mockData';

storiesOf('AuditChart', module).add('default', () => (
  <div className={styles.wrapper}>
    <AuditChart
      start={mockData.data.meta.timeSpanStart}
      end={mockData.data.meta.timeSpanEnd}
      greenTimeSpans={[
        {
          timespanStart: toTimestamp(new Date(2018, 0, 1)),
          timespanEnd: toTimestamp(new Date(2018, 3, 25)),
        },
        {
          timespanStart: toTimestamp(new Date(2018, 3, 26)),
          timespanEnd: toTimestamp(new Date(2018, 5, 20)),
        },
      ]}
      redTimeSpans={[
        {
          timespanStart: toTimestamp(new Date(2018, 3, 25)),
          timespanEnd: toTimestamp(new Date(2018, 3, 26)),
        },
      ]}
    >
      {mockData.data.audits}
    </AuditChart>
  </div>
));
