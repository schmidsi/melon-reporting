import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditChart from '.';

import { toTimestamp } from '~/utils/timestamp';

import styles from './story.css';

import mockData from './mockData';

storiesOf('AuditChart', module)
  .add('default', () => (
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
  ))
  .add('test', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 2, 1)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 6, 1)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 4, 1)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test21', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 2, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 3, 1)),
            timespanEnd: toTimestamp(new Date(2018, 6, 1)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test22', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 3, 1)),
            timespanEnd: toTimestamp(new Date(2018, 6, 1)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 2, 31)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test24', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 6, 1)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 4, 1)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test26', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 6, 1)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 3, 1)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test31', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 1, 27)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 3, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test36', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 1, 27)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 3, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 5, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('test310', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 1, 27)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('latest', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 0, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 1, 1)),
            timespanEnd: toTimestamp(new Date(2018, 1, 27)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 2, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 3, 1)),
            timespanEnd: toTimestamp(new Date(2018, 3, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 4, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 5, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
        ]}
      </AuditChart>
    </div>
  ))
  .add('earliest', () => (
    <div className={styles.nolines}>
      <AuditChart
        start={mockData.data.meta.timeSpanStart}
        end={mockData.data.meta.timeSpanEnd}
        width={520}
      >
        {[
          {
            timespanStart: toTimestamp(new Date(2018, 1, 1)),
            timespanEnd: toTimestamp(new Date(2018, 1, 27)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 2, 1)),
            timespanEnd: toTimestamp(new Date(2018, 2, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 3, 1)),
            timespanEnd: toTimestamp(new Date(2018, 3, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 4, 1)),
            timespanEnd: toTimestamp(new Date(2018, 4, 31)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 5, 1)),
            timespanEnd: toTimestamp(new Date(2018, 5, 30)),
          },
          {
            timespanStart: toTimestamp(new Date(2018, 0, 1)),
            timespanEnd: toTimestamp(new Date(2018, 0, 31)),
          },
        ]}
      </AuditChart>
    </div>
  ));
