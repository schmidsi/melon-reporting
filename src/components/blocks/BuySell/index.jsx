import React from 'react';
import * as R from 'ramda';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const getClassName = R.cond([
  [R.equals('Sell'), R.always(styles.loss)],
  [R.equals('Buy'), R.always(styles.profit)],
]);

const BuySell = ({ children }) => (
  <span className={getClassName(children)}>{children}</span>
);

export default withErrorBoundary(__dirname)(BuySell);
