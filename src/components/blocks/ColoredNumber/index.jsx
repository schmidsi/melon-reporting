import React from 'react';
import * as R from 'ramda';
import { greaterThan, toFixed, lessThan } from '~/utils/functionalBigNumber';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const getClassName = R.cond([
  [n => greaterThan(0, n), R.always(styles.loss)],
  [n => lessThan(0, n), R.always(styles.profit)],
]);

const ColoredNumber = ({ children, decimals = 2 }) => (
  <span className={getClassName(children)}>
    {greaterThan(children, 0) && '+'}
    {toFixed(children, decimals)}
  </span>
);

export default withErrorBoundary(__dirname)(ColoredNumber);
