import React from 'react';

import styles from './styles.css';

const SumCell = ({ children }) => (
  <span className={styles.SumCell}>{children}</span>
);

export default SumCell;
