import React from 'react';
import * as R from 'ramda';
import { isPositive, isNegative } from '~/utils/functionalBigNumber';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const getClassName = R.cond([
  [R.contains(R.__, ['Buy', 'Invest']), R.always(styles.profit)],
  [n => isPositive(parseFloat(n)), R.always(styles.profit)],
  [R.contains(R.__, ['Sell', 'Redeem']), R.always(styles.loss)],
  [n => isNegative(parseFloat(n)), R.always(styles.loss)],
]);

const ColorCondition = ({ children }) => (
  <span className={getClassName(children)}>{children}</span>
);

export default withErrorBoundary(__dirname)(ColorCondition);
