import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '~/data/example-report-data.json';

import Audits from '.';

import storyCss from './story.css';

storiesOf('Templates|Audits', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <Audits data={exampleData} />
    </div>
  </div>
));
