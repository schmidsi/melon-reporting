import React from 'react';
import { storiesOf } from '@storybook/react';
import AuditChart from '.';

import styles from './story.css';

storiesOf('AuditChart', module).add('default', () => (
  <div className={styles.wrapper}>
    <AuditChart />
  </div>
));
