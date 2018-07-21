import React from 'react';

import * as css from './styles.css';

const HexValue = ({ children }) => (
  <span className={css.HexValue}>{children}</span>
);

export default HexValue;
