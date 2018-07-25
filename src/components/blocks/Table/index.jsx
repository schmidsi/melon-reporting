import React from 'react';
import * as R from 'ramda';

import styles from './styles.css';

const getClassName = config =>
  config.align === 'right' ? styles.alignRight : styles.alignLeft;

const renderCell = (content, config) => {
  const Renderer = config.renderer;

  if (config.headerColumn) {
    return (
      <th className={getClassName(config)}>
        {Renderer ? <Renderer>{content}</Renderer> : content}
      </th>
    );
  } else {
    return (
      <td className={getClassName(config)}>
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
          <th className={[config.headerClass, getClassName(config)].join(' ')}>
            {config.headerText}
            {config.sortable && <i>▼</i>}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {children.map(row => (
        <tr>
          {Object.entries(columnConfig).map(([key, config]) =>
            renderCell(row[key], config),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
