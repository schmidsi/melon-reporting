import React from 'react';

import styles from './styles.css';

const DescriptionList = ({ children }) => (
  <div>
    <table className="description-list">
      <style jsx>{styles}</style>
      {Object.entries(children).map(([key, value]) => (
        <tr>
          <th>{key}:</th>
          <td>{value}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default DescriptionList;
