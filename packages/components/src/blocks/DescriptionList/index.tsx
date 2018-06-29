import React from 'react';

import styles from './styles.css';

const DescriptionList = ({ children }) => (
  <dl>
    <style jsx>{styles}</style>
    {Object.entries(children).map(([key, value]) => (
      <React.Fragment key={key}>
        <dt>{key}</dt>
        <dd>{value}</dd>
      </React.Fragment>
    ))}
  </dl>
);

export default DescriptionList;
