import React from 'react';

import css from './styles.css';

const DescriptionList = ({ children }) => (
  <div>
    <table className={css.descriptionList}>
      <tbody>
        {Object.entries(children).map(([key, value]) => (
          <tr key={key}>
            <th>{key}:</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DescriptionList;
