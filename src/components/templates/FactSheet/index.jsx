import React from 'react';
import { format } from 'date-fns';

import {
  format as formatBigNumber,
  displayPercent,
} from '~/utils/functionalBigNumber';

import {
  Title,
  Subtitle,
  MainHeader,
  Heading2,
  Heading3,
  Heading4,
} from '../../design/typography';
import { Column, Container, Spacer } from '../../design/layout';
import TimeSpanPicker from '../../blocks/TimeSpanPicker';
import SharePriceChart from '../../blocks/SharePriceChart';
import DescriptionList from '../../blocks/DescriptionList';
import ColorCondition from '../../blocks/ColorCondition';
import HexValue from '../../blocks/HexValue';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

const FactSheet = ({ data, calculations, calculationsHistory }) => (
  <div>
    <Container>
      <MainHeader>
        <Title>{data.meta.fundName}</Title>
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
        <SharePriceChart data={calculationsHistory} />
        <DescriptionList>
          {[
            [
              'Profit',
              <ColorCondition>
                {formatBigNumber(calculations.profit)}%
              </ColorCondition>,
            ],
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
            data.meta.manager && [
              'Manager',
              [
                data.meta.manager.name,
                <HexValue>{data.meta.manager.address}</HexValue>,
              ],
            ],
            ['Exchanges', data.meta.exchanges.map(e => e.name).join(', ')],
            [''],
            ['Legal Entity', data.meta.legalEntity],
            // ['Report Data Hash', hashReport(data)],
          ]}
        </DescriptionList>
        <Spacer height={0} />
        <Heading2>Strategy </Heading2>
        <p>{data.meta.strategy}</p>
      </Column>
      <Column>
        <DescriptionList detailsAlign="right">
          {[
            [`Share Price`, formatBigNumber(calculations.sharePrice)],
            [
              'Number of Shares',
              `× ${formatBigNumber(calculations.totalSupply)}`,
            ],
            '---',
            [`AUM`, formatBigNumber(calculations.aum)],
            [''],
            ['Mangement Fee', displayPercent(data.meta.managementFee)],
            ['Performance Fee', displayPercent(data.meta.performanceFee)],
            [''],
            ['Transaction Fees (Gas + Fees)', calculations.transactionFees],
            [''],
            ['Volatility / Risk Indicator', calculations.volatility],
          ]}
        </DescriptionList>
        <Spacer height={4} />
        {data.meta.policy && (
          <div>
            <Heading2>Policy </Heading2>
            <Heading3>Portfolio </Heading3>
            <DescriptionList detailsAlign="right">
              {[
                ['Max Positions', data.meta.policy.portfolio.maxPositions],
                [
                  'Best Price Tolerance',
                  displayPercent(data.meta.policy.portfolio.bestPriceTolerance),
                ],
                [
                  'Max Trades',
                  `${data.meta.policy.portfolio.maxTrades.threshold} per ${
                  data.meta.policy.portfolio.maxTrades.timePeriod
                  }`,
                ],
                [
                  `Max Volume (${data.meta.quoteToken.symbol})`,
                  `${data.meta.policy.portfolio.maxVolume.threshold} per ${
                  data.meta.policy.portfolio.maxVolume.timePeriod
                  }`,
                ],
                [
                  'Volatility Threshold',
                  displayPercent(
                    data.meta.policy.portfolio.volatilityThreshold,
                  ),
                ],
              ]}
            </DescriptionList>

            <Heading3>Tokens </Heading3>
            <Heading4>Whitelist </Heading4>
            <p>
              {data.meta.policy.tokens.whitelist.map(t => t.symbol).join(', ')}
            </p>

            <DescriptionList detailsAlign="right">
              {[
                [
                  'Liquidity',
                  `${data.meta.policy.tokens.liquidityInDays} days`,
                ],
                [
                  'Market Cap Range',
                  `${data.meta.policy.tokens.marketCapRange.min} - ${
                  data.meta.policy.tokens.marketCapRange.max
                  }`,
                ],
                [
                  'Volatility Threshold',
                  displayPercent(data.meta.policy.tokens.volatilityThreshold),
                ],
              ]}
            </DescriptionList>
            <Heading3>Participation </Heading3>
            <DescriptionList detailsAlign="right">
              {[
                [
                  'Investment Fee',
                  displayPercent(data.meta.policy.participation.investmentFee),
                ],
                [
                  'Redeem Fee',
                  displayPercent(data.meta.policy.participation.redeemFee),
                ],
                data.meta.policy.participation.complianceModule && [
                  'Compliance Module',
                  data.meta.policy.participation.complianceModule.name,
                ],
              ]}
            </DescriptionList>
          </div>
        )}
      </Column>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(FactSheet);
