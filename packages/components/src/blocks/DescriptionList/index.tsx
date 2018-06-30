import React from 'react';

import styles from './styles.css';

const DescriptionList = ({ children }) => (
  <div>
    <table className="description-list">
      <style jsx>{styles}</style>
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
