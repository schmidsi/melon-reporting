import React from 'react';

import styles from './styles.css';

const Col = ({ children, proportion }) => (
  <div className={styles.col} style={{ flexGrow: proportion }}>
    {children}
  </div>
);

export default Col;
