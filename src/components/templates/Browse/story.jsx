import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Browse from '.';

storiesOf('Templates|Browse', module).add('default', () => (
  <BrowserRouter>
    <Browse>
      {[
        {
          rank: 1,
          name: 'asfd',
          address: '0x123',
          inception: new Date(),
          sharePrice: '1',
        },
      ]}
    </Browse>
  </BrowserRouter>
));
