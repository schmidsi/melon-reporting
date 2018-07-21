import React from 'react';

import styles from './styles.css';

const MainHeader = ({ children }) => (
  <header className={styles.MainHeader}>{children}</header>
);

export default MainHeader;
