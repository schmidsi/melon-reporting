import React from 'react';
import { format } from 'date-fns';

import * as css from './styles.css';

const TimeSpanPicker = ({ start, end }) => (
  <span>
    <span className={css.underline}> {format(start, 'D. MMM YYYY')} ▼</span> to{' '}
    <span className={css.underline}> {format(end, 'D. MMM YYYY')} ▼</span>
  </span>
);

export default TimeSpanPicker;
