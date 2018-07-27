import React from 'react';
import * as R from 'ramda';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const getClassName = R.cond([
  [R.gt(0), R.always(styles.loss)],
  [R.lt(0), R.always(styles.profit)],
]);

const ColoredNumber = ({ children, decimals = 2 }) => (
  <span className={getClassName(children)}>
    {children > 0 && '+'}
    {children.toFixed(decimals)}
  </span>
);

export default withErrorBoundary(__dirname)(ColoredNumber);
