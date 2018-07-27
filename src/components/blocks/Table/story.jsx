import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from './';

const style = { margin: '0 auto', width: 600 };

const DummyRenderer = ({ children }) => (
  <span style={{ color: 'green' }}>{children}</span>
);

// Order of object keys in ES2015 https://stackoverflow.com/questions/30076219/does-es6-introduce-a-well-defined-order-of-enumeration-for-object-properties
storiesOf('Table', module).add('default', () => (
  <div style={style}>
    <Table
      columnConfig={{
        token: {
          headerText: 'Token',
          headerClass: '',
          headerColumn: true,
          sortable: true,
        },
        price: {
          headerText: 'Price',
          sortable: true,
          renderer: DummyRenderer,
          align: 'right',
        },
        change: {
          headerText: 'Chg',
          sortable: true,
          align: 'right',
        },
        quantity: {
          headerText: 'Qty',
          sortable: true,
          align: 'right',
        },
      }}
    >
      {[
        {
          token: 'MLN',
          price: 71.761,
          change: 100,
          quantity: 1234,
        },
        {
          token: 'MLN',
          price: 71.761,
          change: 200,
          quantity: 1234,
        },
        {
          token: 'MLN',
          price: 71.761,
          change: 300,
          quantity: 1234,
        },
      ]}
    </Table>
  </div>
));
