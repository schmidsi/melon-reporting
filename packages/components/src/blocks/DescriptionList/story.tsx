import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DescriptionList from './';

import global from '../../global.css';

storiesOf(DescriptionList.name, module).add('default', () => (
  <div>
    <style jsx>{global}</style>
    <DescriptionList size={7} detailsAlign="right">
      {{
        Profit: <span style={{ color: 'green' }}>+50%</span>,
        Address: '0xdeadbeef',
        Category: 'Manager Traded Fund',
      }}
    </DescriptionList>
  </div>
));
