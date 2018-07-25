import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from '../../design/typography';
import { Column, Container, Spacer } from '../../design/layout';
import ColoredNumber from '../../blocks/ColoredNumber';
import HexValue from '../../blocks/HexValue';
import Table from '~/components/blocks/Table';

const calcPercentage = (start, end) => (100 * (end - start)) / start;

const Holdings = ({ data, calculations }) => (
  <div>
    <Container>
      <Column>
        <Heading1>Holdings</Heading1>
        <Table
          columnConfig={{
            token: {
              headerText: 'Token',
              headerClass: '',
              headerColumn: true,
              sortable: true,
            },
            price: {
              headerText: 'Price',
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
              headerText: 'Value',
              sortable: true,
              align: 'right',
            },
          }}
        >
          {data.holdings.map(holding => ({
            token: holding.token.symbol,
            price: R.head(holding.priceHistory),
            change: calcPercentage(
              R.head(holding.priceHistory),
              R.last(holding.priceHistory),
            ),
            quantity: holding.quantity,
            value: holding.quantity * R.head(holding.priceHistory),
          }))}
        </Table>
      </Column>
    </Container>
  </div>
);

export default Holdings;
