import React from 'react';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const SumCell = ({ children }) => (
  <span className={styles.SumCell}>{children}</span>
);

export default withErrorBoundary(__dirname)(SumCell);
