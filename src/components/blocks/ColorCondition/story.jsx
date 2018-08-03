import React from 'react';
import { storiesOf } from '@storybook/react';

import ColorCondition from ".";

storiesOf('ColorCondition', module).add('default', () => (
  <div>
    <ul>
      <li>
        <ColorCondition>Buy</ColorCondition>
      </li>
      <li>
        <ColorCondition>Sell</ColorCondition>
      </li>
      <li>
        <ColorCondition>Nope</ColorCondition>
      </li>
      <li>
        <ColorCondition>Invest</ColorCondition>
      </li>
      <li>
        <ColorCondition>invest</ColorCondition>
      </li>
      <li>
        <ColorCondition>Redeem</ColorCondition>
      </li>
      <li>
        <ColorCondition>{10}</ColorCondition>
      </li>
      <li>
        <ColorCondition>{-10}</ColorCondition>
      </li>
      <li>
        <ColorCondition>{0}</ColorCondition>
      </li>
      <li>
        <ColorCondition>0</ColorCondition>
      </li>
      <li>
        <ColorCondition>1.2345</ColorCondition>
      </li>
      <li>
        <ColorCondition>-5.32%</ColorCondition>
      </li>
    </ul>
  </div>
));
