import React from 'react';

import css from './styles.css';

const DescriptionList = ({ children }) => (
  <div>
    <table className={css.DescriptionList}>
      <tbody>
        {children.map(
          ([key, value]) =>
            key ? (
              <tr key={key}>
                <th>{key}:</th>
                <td>{value}</td>
              </tr>
            ) : (
              <tr key={`dl-${Math.random()}`} className={css.emptyRow}>
                <td colSpan={2} />
              </tr>
            ),
        )}
      </tbody>
    </table>
  </div>
);

export default DescriptionList;
