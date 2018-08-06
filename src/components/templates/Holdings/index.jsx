import React from 'react';

import { Heading1 } from '~/components/design/typography';
import { Column, Container, PageBreak } from '~/components/design/layout';
import ColorCondition from '~/components/blocks/ColorCondition';
import Table from '~/components/blocks/Table';
import SumCell from '~/components/blocks/SumCell';
import HoldingChart from '~/components/blocks/HoldingChart';
import HoldingBars from '~/components/blocks/HoldingBars';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import { format, multiply, displayPercent } from '~/utils/functionalBigNumber';

const Holdings = ({ data, calculations }) => (
  <div>
    <PageBreak />
    <Container>
      <Heading1>Holdings</Heading1>
    </Container>
    <Container>
      <HoldingBars allocations={calculations.allocation}>
        <Container>
          <Column>
            <Table
              columnConfig={{
                token: {
                  headerColumn: true,
                  sortable: true,
                },
                price: {
                  sortable: true,
                  align: 'right',
                },
                change: {
                  headerText: 'Chg',
                  sortable: true,
                  renderer: ColorCondition,
                  align: 'right',
                },
                quantity: {
                  headerText: 'Qty',
                  sortable: true,
                  align: 'right',
                },
                value: {
                  sortable: true,
                  align: 'right',
                },
              }}
            >
              {[
                ...calculations.allocation.map(holding => ({
                  token: holding.token.symbol,
                  price: format(holding.price),
                  change: displayPercent(holding.change),
                  quantity: format(holding.quantity),
                  value: format(multiply(holding.value)),
                })),
                {
                  token: 'Fund',
                  price: format(calculations.sharePrice),
                  change: displayPercent(calculations.profit),
                  quantity: format(calculations.totalSupply),
                  value: <SumCell>{format(calculations.aum)}</SumCell>,
                },
              ]}
            </Table>
          </Column>
          <Column>
            <Table
              design="small"
              columnConfig={data.holdings.reduce(
                (carry, holding) => ({
                  ...carry,
                  [holding.token.symbol]: {
                    headerText: holding.token.symbol,
                    align: 'right',
                  },
                }),
                {},
              )}
            >
              {calculations.tokenCorrelation}
            </Table>
          </Column>
        </Container>
      </HoldingBars>
    </Container>
    <Container>
      <Column>
        <HoldingChart data={calculations.holdingsChart} />
      </Column>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Holdings);
