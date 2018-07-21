import React from 'react';
import { storiesOf } from '@storybook/react';
import DescriptionList from './';

storiesOf('DescriptionList', module).add('default', () => (
  <div>
    <DescriptionList size={7} detailsAlign="right">
      {[
        ['Profit', <span style={{ color: 'green' }}>+50%</span>],
        [''],
        ['Address', '0xdeadbeef'],
        null,
        ['Category', 'Manager Traded Fund'],
      ]}
    </DescriptionList>
  </div>
));
