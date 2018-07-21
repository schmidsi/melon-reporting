import React from 'react';
import { storiesOf } from '@storybook/react';

import HexValue from './';

storiesOf('HexValue', module).add('default', () => (
  <div>
    <HexValue>0xdeadbeef</HexValue>
  </div>
));
