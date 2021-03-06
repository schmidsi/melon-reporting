import React from 'react';
import { storiesOf } from '@storybook/react';

import exampleData from '~/data/example-report-data.json';

import { toTimestamp } from '~/utils/timestamp';

import Audits from '.';

import storyCss from './story.css';

storiesOf('Templates|Audits', module).add('default', () => (
  <div>
    <div className={storyCss.background} />
    <div className={storyCss.overlay}>
      <Audits
        data={exampleData}
        calculations={{
          auditedTimespans: {
            audited: [
              {
                timespanStart: toTimestamp(new Date(2018, 0, 1)),
                timespanEnd: toTimestamp(new Date(2018, 1, 27)),
              },
              {
                timespanStart: toTimestamp(new Date(2018, 2, 1)),
                timespanEnd: toTimestamp(new Date(2018, 2, 26)),
              },
            ],
            gaps: [
              {
                timespanStart: toTimestamp(new Date(2018, 1, 27)),
                timespanEnd: toTimestamp(new Date(2018, 2, 1)),
              },
            ],
          },
        }}
      />
    </div>
  </div>
));
