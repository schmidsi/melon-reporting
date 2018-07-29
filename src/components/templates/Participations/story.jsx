import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '~/data/example-report-data.json';

import Participations from './';

import storyCss from './story.css';

const calculations = {
  investors: [
    {
      address: '0xcDcCB1259CF7388D9018009349C945Cc35d5AFbE',
      invests: 1,
      redeems: 0,
      shares: '2387.923990',
    },
    {
      address: '0xd1324AEd96fC94e219c3663A665c6e398D8634Db',
    },
  ],
};

storiesOf('Templates|Participations', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <Participations data={exampleData} calculations={calculations} />
    </div>
  </div>
));
