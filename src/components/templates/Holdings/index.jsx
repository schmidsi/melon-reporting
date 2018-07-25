import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from '../../design/typography';
import { Column, Container, Spacer } from '../../design/layout';
import ColoredNumber from '../../blocks/ColoredNumber';
import HexValue from '../../blocks/HexValue';

const Holdings = ({ data, calculations }) => (
  <div>
    <Container>
      <Heading1>Holdings</Heading1>
    </Container>
  </div>
);

export default Holdings;
