import React from 'react';
import { storiesOf } from '@storybook/react';

import Report from './';

storiesOf('Pages', module).add('factsheet', () => (
  <div
    style={{
      backgroundImage: 'url(./01-factsheet@2x.png)',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 1190,
      height: 1684,
    }}
  >
    <div style={{ mixBlendMode: 'color-burn' }}>
      <Report data={{}} />
    </div>
  </div>
));
