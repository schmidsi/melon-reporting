import React from 'react';
import * as R from 'ramda';

import calcKey from '~/components/utils/calcKey';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const getClassName = config =>
  config.align === 'right' ? styles.alignRight : styles.alignLeft;

const renderCell = (content, config, key) => {
  const Renderer = config.renderer;

  if (config.headerColumn) {
    return (
      <th className={getClassName(config)} key={key}>
        {Renderer ? <Renderer>{content}</Renderer> : content}
      </th>
    );
  } else {
    return (
      <td className={getClassName(config)} key={key}>
        {Renderer ? <Renderer>{content}</Renderer> : content}
      </td>
    );
  }
};

const Table = ({ columnConfig, children }) => (
  <table className={styles.Table}>
    <thead>
      <tr>
        {Object.entries(columnConfig).map(([key, config]) => (
          <th
            className={[config.headerClass, getClassName(config)].join(' ')}
            key={key}
          >
            {config.headerText}
            {config.sortable && <i>▼</i>}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {children.map(row => (
        <tr key={calcKey(row)}>
          {Object.entries(columnConfig).map(([key, config]) =>
            renderCell(row[key], config, key),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default withErrorBoundary(__dirname)(Table);
