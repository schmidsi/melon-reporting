import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';
import Col from './Col';

storiesOf('Layout', module).add('default', () => (
  <Container>
    <Col proportion={7}>Lorem Ipsuma</Col>
    <Col proportion={5}>Dolor sit amet</Col>
  </Container>
));
