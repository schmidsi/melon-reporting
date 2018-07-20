import React from 'react';

import { Title, Subtitle, MainHeader } from '../../design/typography';
import { Column, Container } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';
import DescriptionList from '../../blocks/DescriptionList';
import ColoredNumber from '../../blocks/ColoredNumber';

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
      <DescriptionList>
        {[['Profit', <ColoredNumber>{5.23}</ColoredNumber>], [null]]}
      </DescriptionList>
    </Column>
  </Container>
);

export default Report;
