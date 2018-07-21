import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeSpanPicker from './';

storiesOf('TimeSpanPicker', module).add('default', () => (
  <div>
    <TimeSpanPicker start={new Date(2018, 0, 1)} end={new Date(2018, 2, 31)} />
  </div>
));
