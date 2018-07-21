import React from 'react';
import * as R from 'ramda';

import css from './styles.css';

const renderLine = ([key, value], detailsAlign) => (
  <tr key={key}>
    {console.log(css[`Details-${detailsAlign}`])}
    <th>{key}:</th>
    <td className={css[`Details-${detailsAlign}`]}>
      {Array.isArray(value) ? value.map(line => <div>{line}</div>) : value}
    </td>
  </tr>
);

const emptyLine = () => (
  <tr key={`dl-${Math.random()}`} className={css.emptyRow}>
    <td colSpan={2} />
  </tr>
);

const horizontalRule = () => (
  <tr key={`dl-${Math.random()}`} className={css.horizontalRule}>
    <td colSpan={2} />
  </tr>
);

const lineMapper = detailsAlign =>
  R.cond([
    [line => line === '---', horizontalRule],
    [line => line && line.length > 1, line => renderLine(line, detailsAlign)],
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
const DescriptionList = ({ children, detailsAlign = 'left' }) => (
  <table className={css.DescriptionList}>
    <tbody>{children.length && children.map(lineMapper(detailsAlign))}</tbody>
  </table>
);

export default DescriptionList;
