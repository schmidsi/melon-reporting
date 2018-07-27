import React from 'react';
import { storiesOf } from '@storybook/react';
import SumCell from './';

const style = { margin: '0 auto', width: 100 };

storiesOf('SumCell', module).add('default', () => (
  <div style={style}>
    <SumCell>1234.123</SumCell>
  </div>
));
