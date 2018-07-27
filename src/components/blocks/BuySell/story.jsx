import React from 'react';
import { storiesOf } from '@storybook/react';

import BuySell from './';

storiesOf('BuySell', module).add('default', () => (
  <div>
    <ul>
      <li>
        <BuySell>Buy</BuySell>
      </li>
      <li>
        <BuySell>Sell</BuySell>
      </li>
      <li>
        <BuySell>Nope</BuySell>
      </li>
    </ul>
  </div>
));
