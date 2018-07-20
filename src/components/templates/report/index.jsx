import React from 'react';

import { Title, Subtitle, MainHeader } from '../../design/typography';
import { Column, Container } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';

const Report = ({ data }) => (
  <Container>
    <Column>
      <MainHeader>
        <Title>{data.meta.fundName}</Title>
        <Subtitle>
          Report from{' '}
          <TimeSpanPicker
            start={new Date(data.meta.timespanStart * 1000)}
            end={new Date(data.meta.timespanEnd * 1000)}
          />
        </Subtitle>
      </MainHeader>
      <SharePriceChart data={[1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]} />
    </Column>
  </Container>
);

export default Report;
