import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DescriptionList from './';

storiesOf(DescriptionList.name, module).add('with text', () => (
  <DescriptionList size={7} detailsAlign="right">
    {{
      Profit: <span style={{ color: 'green' }}>+50%</span>,
      Address: '0xdeadbeef',
      Category: 'Manager Traded Fund',
    }}
  </DescriptionList>
));
