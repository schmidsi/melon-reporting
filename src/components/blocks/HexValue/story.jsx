import React from 'react';
import { storiesOf } from '@storybook/react';

import HexValue from './';

storiesOf('HexValue', module)
  .add('default', () => (
    <div>
      <HexValue>0xdeadbeef</HexValue>
    </div>
  ))
  .add('short', () => (
    <div>
      <HexValue short>0xdeadbeefdeadbeefdeadbeef</HexValue>
    </div>
  ));
