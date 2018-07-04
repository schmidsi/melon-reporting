import React from 'react';

import styles from './styles.css';

const Subtitle = ({ children }) => (
  <h2 className={styles.subtitle}>{children}</h2>
);

export default Subtitle;
