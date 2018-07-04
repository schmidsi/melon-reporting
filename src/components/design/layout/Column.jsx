import React from 'react';

import css from './styles.css';

const Col = ({ children, proportion }) => (
  <div className={css.col} style={{ flexGrow: proportion }}>
    {children}
  </div>
);

export default Col;
