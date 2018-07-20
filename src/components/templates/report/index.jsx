import React from 'react';

import { Title, Subtitle, MainHeader } from '../../design/typography';
import { Column, Container } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';

const Report = () => (
  <Container>
    <Column>
      <MainHeader>
        <Title>Melon Crypto Capital</Title>
        <Subtitle>
          Report from{' '}
          <TimeSpanPicker
            start={new Date(2018, 0, 1)}
            end={new Date(2018, 2, 31)}
          />
        </Subtitle>
      </MainHeader>
      <SharePriceChart data={[1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]} />
    </Column>
  </Container>
);

export default Report;
