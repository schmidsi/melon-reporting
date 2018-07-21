import React from 'react';

import css from './styles.css';

const renderLine = ([key, value]) => (
  <tr key={key}>
    <th>{key}:</th>
    <td>{value}</td>
  </tr>
);

const emptyLine = (
  <tr key={`dl-${Math.random()}`} className={css.emptyRow}>
    <td colSpan={2} />
  </tr>
);

const DescriptionList = ({ children }) => (
  <div>
    <table className={css.DescriptionList}>
      <tbody>
        {children.length &&
          children.map(
            line => (line && line.length === 2 ? renderLine(line) : emptyLine),
          )}
      </tbody>
    </table>
  </div>
);

export default DescriptionList;
