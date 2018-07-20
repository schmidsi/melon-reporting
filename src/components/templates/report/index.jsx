import React from 'react';
import { format } from 'date-fns';

import { Title, Subtitle, MainHeader } from '../../design/typography';
import { Column, Container } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';
import DescriptionList from '../../blocks/DescriptionList';
import ColoredNumber from '../../blocks/ColoredNumber';

import hashReport from '../../../api/hashReport';

const Report = ({ data }) => (
  <Container>
    <Column>
      <MainHeader>
        <Title>{console.log(data) || data.meta.fundName}</Title>
        <Subtitle>
          Report from{' '}
          <TimeSpanPicker
            start={new Date(data.meta.timeSpanStart * 1000)}
            end={new Date(data.meta.timeSpanEnd * 1000)}
          />
        </Subtitle>
      </MainHeader>
      <SharePriceChart data={[1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]} />
      <DescriptionList>
        {[
          ['Profit', <ColoredNumber>{5.23}</ColoredNumber>],
          [null, null],
          ['Address (ID)', data.meta.fundAddress],
          [
            'Report Span (UTC)',
            `${format(
              new Date(data.meta.timeSpanStart * 1000),
              'YYYY-MM-DD HH-mm-ss',
            )} - ${format(
              new Date(data.meta.timeSpanEnd * 1000),
              'YYYY-MM-DD HH-mm-ss',
            )}`,
          ],
          ['Quote Token', data.meta.quoteToken.symbol],
          ['Report Data Hash', hashReport(data)],
        ]}
      </DescriptionList>
    </Column>
  </Container>
);

export default Report;
