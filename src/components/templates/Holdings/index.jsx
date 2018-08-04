import React from 'react';
import * as R from 'ramda';

import { Heading1 } from '~/components/design/typography';
import { Column, Container } from '~/components/design/layout';
import ColorCondition from '~/components/blocks/ColorCondition';
import Table from '~/components/blocks/Table';
import SumCell from '~/components/blocks/SumCell';
import HoldingChart from '~/components/blocks/HoldingChart';
import HoldingBars from '~/components/blocks/HoldingBars';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import { format, multiply } from '~/utils/functionalBigNumber';

const calcPercentage = (start, end) => (100 * (end - start)) / start;

const Holdings = ({ data, calculations }) => (
  <div>
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
                ...data.holdings.map(holding => ({
                  token: holding.token.symbol,
                  price: format(R.head(holding.priceHistory)),
                  change: format(
                    calcPercentage(
                      R.head(holding.priceHistory),
                      R.last(holding.priceHistory),
                    ),
                    2,
                  ),
                  quantity: format(holding.quantity),
                  value: format(
                    multiply(holding.quantity, R.head(holding.priceHistory)),
                  ),
                })),
                {
                  token: 'Fund',
                  price: format(calculations.sharePrice),
                  change: format(calculations.profit, 2),
                  quantity: format(data.meta.totalSupply),
                  value: (
                    <SumCell>
                      {format(
                        multiply(
                          calculations.sharePrice,
                          data.meta.totalSupply,
                        ),
                      )}
                    </SumCell>
                  ),
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
