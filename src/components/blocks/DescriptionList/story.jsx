import React from 'react';
import { storiesOf } from '@storybook/react';
import DescriptionList from './';

const style = { margin: '0 auto', width: 400 };

storiesOf('DescriptionList', module)
  .add('default', () => (
    <div style={style}>
      <DescriptionList size={7}>
        {[
          ['Profit', <span style={{ color: 'green' }}>+50%</span>],
          [''],
          ['Address', '0xdeadbeef'],
          null,
          ['Category', 'Manager Traded Fund'],
          '---',
          ['Multiline', ['Line 1', 'Line 2']],
        ]}
      </DescriptionList>
    </div>
  ))
  .add('right align', () => (
    <div style={style}>
      <DescriptionList size={7} detailsAlign="right">
        {[
          ['Profit', <span style={{ color: 'green' }}>+50%</span>],
          [''],
          ['Address', '0xdeadbeef'],
          null,
          ['Category', 'Manager Traded Fund'],
          ['Multiline', ['Line 1', 'Line 2']],
        ]}
      </DescriptionList>
    </div>
  ));
