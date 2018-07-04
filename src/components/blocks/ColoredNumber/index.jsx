import React from 'react';
import * as R from 'ramda';

import * as css from './styles.css';

const getClassName = R.cond([
  [R.gt(0), R.always(css.loss)],
  [R.lt(0), R.always(css.profit)],
]);

const ColoredNumber = ({ children, decimals = 2 }) => (
  <span className={getClassName(children)}>{children.toFixed(decimals)}</span>
);

export default ColoredNumber;
