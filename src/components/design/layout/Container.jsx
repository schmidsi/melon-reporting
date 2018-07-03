import React from 'react';

import css from './styles.css';

const Container = ({ children }) => (
  <div className={css.container}>{children}</div>
);

export default Container;
