import React from 'react';
import * as R from 'ramda';

import css from './styles.css';

const renderLine = ([key, value]) => (
  <tr key={key}>
    <th>{key}:</th>
    <td>
      {Array.isArray(value) ? value.map(line => <div>{line}</div>) : value}
    </td>
  </tr>
);

const emptyLine = () => (
  <tr key={`dl-${Math.random()}`} className={css.emptyRow}>
    <td colSpan={2} />
  </tr>
);

const lineMapper = R.cond([
  [line => line && line.length > 1, renderLine],
  [line => line && line.length === 1, emptyLine],
  [() => true, () => null],
]);

/**
 *
 * children is an array in the following shape
 * [
 *  ["Title", <Content>],
 *  [""], // Empty row
 *  null, // Ignored
 * ]
 */
const DescriptionList = ({ children }) => (
  <table className={css.DescriptionList}>
    <tbody>{children.length && children.map(lineMapper)}</tbody>
  </table>
);

export default DescriptionList;
