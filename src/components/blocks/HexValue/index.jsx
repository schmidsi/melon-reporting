import React from 'react';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const shortener = string => `${string.slice(0, 6)}…${string.slice(-4)}`;

const HexValue = ({ children, short = false }) => (
  <span className={styles.HexValue}>
    {short ? shortener(children) : children}
  </span>
);

export default withErrorBoundary(__dirname)(HexValue);
