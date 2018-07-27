import React from 'react';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const HexValue = ({ children }) => (
  <span className={styles.HexValue}>{children}</span>
);

export default withErrorBoundary(__dirname)(HexValue);
