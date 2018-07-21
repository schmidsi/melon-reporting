import React from 'react';
import { format } from 'date-fns';

import { Title, Subtitle, MainHeader, H2 } from '../../design/typography';
import { Column, Container, Spacer } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';
import DescriptionList from '../../blocks/DescriptionList';
import ColoredNumber from '../../blocks/ColoredNumber';
import HexValue from '../../blocks/HexValue';

import hashReport from '../../../api/hashReport';

const Report = ({ data, calculations }) => (
  <div>
    <Container>
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
    </Container>
    <Container>
      <Column>
        <SharePriceChart data={[1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]} />
        <DescriptionList>
          {[
            ['Profit', <ColoredNumber>{5.23}</ColoredNumber>],
            [''],
            ['Address (ID)', <HexValue>{data.meta.fundAddress}</HexValue>],
            [
              'Report Span (UTC)',
              `${format(
                new Date(data.meta.timeSpanStart * 1000),
                'YYYY-MM-DD HH:mm:ss',
              )} - ${format(
                new Date(data.meta.timeSpanEnd * 1000),
                'YYYY-MM-DD HH:mm:ss',
              )}`,
            ],
            [
              'Inception',
              format(new Date(data.meta.inception * 1000), 'D.MMM YYYY'),
            ],
            ['Quote Token', data.meta.quoteToken.symbol],
            data.meta.category && ['Category', data.meta.category],
            data.meta.reference && ['Reference', data.meta.reference],
            [
              'Manager',
              [
                data.meta.manager.name,
                <HexValue>{data.meta.manager.address}</HexValue>,
              ],
            ],
            ['Exchanges', data.meta.exchanges.map(e => e.name).join(', ')],
            [''],
            ['Legal Entity', data.meta.legalEntity],
            //['Report Data Hash', hashReport(data)],
          ]}
        </DescriptionList>
        <Spacer height={0} />
        <H2>Strategy</H2>
        <p>{data.meta.strategy}</p>
      </Column>
      <Column>
        <DescriptionList detailsAlign="right">
          {[
            [
              `Share Price ${data.meta.quoteToken.symbol}/Share`,
              calculations.sharePrice,
            ],
            ['Total Number of Shares', `× ${data.meta.totalSupply}`],
            '---',
            [
              `Assets Under Management (${data.meta.quoteToken.symbol})`,
              calculations.sharePrice * data.meta.totalSupply,
            ],
          ]}
        </DescriptionList>
      </Column>
    </Container>
  </div>
);

export default Report;
