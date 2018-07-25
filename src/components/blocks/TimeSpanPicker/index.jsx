import React from 'react';
import { format } from 'date-fns';

import styles from './styles.css';

const TimeSpanPicker = ({ start, end }) => (
  <span>
    <span className={styles.underline}>
      {' '}
      {format(start, 'D. MMM YYYY')}
      <i>▼</i>
    </span>{' '}
    to{' '}
    <span className={styles.underline}>
      {' '}
      {format(end, 'D. MMM YYYY')}
      <i>▼</i>
    </span>
  </span>
);

export default TimeSpanPicker;
