import React from 'react';

import styles from './styles.css';

const HexValue = ({ children }) => (
  <span className={styles.HexValue}>{children}</span>
);

export default HexValue;
