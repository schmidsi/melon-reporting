import React from 'react';
import { format } from 'date-fns';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const TimeSpanPicker = ({ start, end }) => (
  <span>
    <span className={0 /* styles.underline */}>
      {' '}
      {format(start, 'D. MMM YYYY')}
      {/* <i>▼</i> */}
    </span>{' '}
    to{' '}
    <span className={0 /* styles.underline */}>
      {' '}
      {format(end, 'D. MMM YYYY')}
      {/* <i>▼</i> */}
    </span>
  </span>
);

export default withErrorBoundary(__dirname)(TimeSpanPicker);
