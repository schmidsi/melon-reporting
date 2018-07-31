import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from '~/components/design/typography';
import { Column, Container } from '~/components/design/layout';
import ColoredNumber from '~/components/blocks/ColoredNumber';
import HexValue from '~/components/blocks/HexValue';
import Table from '~/components/blocks/Table';
import SumCell from '~/components/blocks/SumCell';
import HoldingChart from '~/components/blocks/HoldingChart';
import withErrorBoundary from '~/components/utils/withErrorBoundary';
import { toFixed, multiply } from '~/utils/functionalBigNumber';

const calcPercentage = (start, end) => (100 * (end - start)) / start;

const Holdings = ({ data, calculations }) => (
  <div>
    <Container>
      <Heading1>Holdings</Heading1>
    </Container>
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
              renderer: ColoredNumber,
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
              price: toFixed(R.head(holding.priceHistory)),
              change: calcPercentage(
                R.head(holding.priceHistory),
                R.last(holding.priceHistory),
              ),
              quantity: toFixed(holding.quantity),
              value: toFixed(
                multiply(holding.quantity, R.head(holding.priceHistory)),
              ),
            })),
            {
              token: 'Fund',
              price: toFixed(calculations.sharePrice),
              change: calculations.profit,
              quantity: toFixed(data.meta.totalSupply),
              value: (
                <SumCell>
                  {toFixed(
                    multiply(calculations.sharePrice, data.meta.totalSupply),
                  )}
                </SumCell>
              ),
            },
          ]}
        </Table>
      </Column>
      <Column>
        <Table
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
    <Container>
      <Column>
        <HoldingChart data={calculations.holdingsChart} />
      </Column>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Holdings);
