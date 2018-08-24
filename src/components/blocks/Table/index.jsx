import React from 'react';
import titleCase from 'title-case';

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
  }
  return (
    <td className={getClassName(config)} key={key}>
      {Renderer ? <Renderer>{content}</Renderer> : content}
    </td>
  );
};

const Table = ({ columnConfig, children, design }) => (
  <table className={`${styles.Table} ${styles[design]}`}>
    <thead>
      <tr>
        {Object.entries(columnConfig).map(([key, config]) => (
          <th
            className={[config.headerClass, getClassName(config)].join(' ')}
            key={key}
          >
            {config.headerText || titleCase(key)}
            {/* {config.sortable && <i>▼</i>} */}
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
