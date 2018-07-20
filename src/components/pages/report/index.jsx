import React from 'react';

import { Title, Subtitle } from '../../design/typography';
import { Column, Container } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';

const Report = () => (
  <Container>
    <Column>
      <Title>Melon Crypto Capital</Title>
      <Subtitle>
        Report from{' '}
        <TimeSpanPicker
          start={new Date(2018, 0, 1)}
          end={new Date(2018, 2, 31)}
        />
      </Subtitle>
    </Column>
  </Container>
);

export default Report;
