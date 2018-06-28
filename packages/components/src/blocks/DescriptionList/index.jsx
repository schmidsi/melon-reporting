import React from 'react';

const DescriptionList = ({ children }) => (
  <dl>
    {Object.entries(children).map(([key, value]) => (
      <React.Fragment key={key}>
        <dt>{key}</dt>
        <dd>{value}</dd>
      </React.Fragment>
    ))}
  </dl>
);

export default DescriptionList;
