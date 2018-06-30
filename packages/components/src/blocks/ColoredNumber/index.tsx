import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';

import styles from './styles.css';

const getClassName = R.cond([
  [R.gt(0), R.always('  profit')],
  [R.lt(0), R.always('loss')],
]);

const ColoredNumber = ({ children, decimals = 2 }) => (
  <span className={classNames('colored-number', getClassName(children))}>
    <style jsx>{styles}</style>
    {children.toFixed(decimals)}
  </span>
);

export default ColoredNumber;
