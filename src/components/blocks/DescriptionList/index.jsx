import React from 'react';
import * as R from 'ramda';

import calcKey from '~/components/utils/calcKey';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const renderLine = ([key, value], detailsAlign) => (
  <tr key={key}>
    <th>{key}:</th>
    <td className={styles[`Details-${detailsAlign}`]}>
      {Array.isArray(value)
        ? value.map((line, i) => <div key={line || `l-${i}`}>{line}</div>)
        : value}
    </td>
  </tr>
);

const emptyLine = (line, index) => (
  <tr key={`dl-el-${index}`} className={styles.emptyRow}>
    <td colSpan={2} />
  </tr>
);

const horizontalRule = (line, index) => (
  <tr key={`dl-hr-${index}`} className={styles.horizontalRule}>
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
  <table className={styles.DescriptionList}>
    <tbody>{children.length && children.map(lineMapper(detailsAlign))}</tbody>
  </table>
);

export default withErrorBoundary(__dirname)(DescriptionList);
