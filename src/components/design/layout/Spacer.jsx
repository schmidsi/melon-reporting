import React from 'react';

import css from './styles.css';

const Spacer = ({ height }) => (
  <div
    style={
      height === 0
        ? { height: 1, marginBottom: -1 }
        : {
            height: `${height * (32 / 18)}rem`,
          }
    }
  />
);

export default Spacer;
