import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';
import Column from './Column';

storiesOf('Layout', module).add('default', () => (
  <Container>
    <Column proportion={7}>Lorem Ipsuma</Column>
    <Column proportion={5}>Dolor sit amet</Column>
  </Container>
));
