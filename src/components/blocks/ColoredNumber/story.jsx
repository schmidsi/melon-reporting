import React from 'react';
import { storiesOf } from '@storybook/react';

import ColoredNumber from './';

storiesOf('ColoredNumber', module).add('default', () => (
  <div>
    <ul>
      <li>
        <ColoredNumber>{1203.123}</ColoredNumber>
      </li>
      <li>
        <ColoredNumber>{0}</ColoredNumber>
      </li>
      <li>
        <ColoredNumber>{-123.0}</ColoredNumber>
      </li>
      <li>
        <ColoredNumber decimals={3}>{-123.12351234}</ColoredNumber>
      </li>
    </ul>
  </div>
));