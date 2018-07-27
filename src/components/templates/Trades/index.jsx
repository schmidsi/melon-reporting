import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';

import { Heading1 } from '~/components/design/typography';
import { Column, Container } from '~/components/design/layout';
import ColoredNumber from '~/components/blocks/ColoredNumber';
import BuySell from '~/components/blocks/BuySell';
import HexValue from '~/components/blocks/HexValue';
import Table from '~/components/blocks/Table';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import { divide, toFixed } from '~/utils/functionalBigNumber';

const defaultColumnConfig = {
  sortable: true,
  align: 'right',
};

const Trades = ({ data, calculations }) => (
  <div>
    <Container>
      <Heading1>Trades</Heading1>
    </Container>
    <Container>
      <Table
        columnConfig={{
          pair: {
            sortable: true,
          },
          type: {
            sortable: true,
            renderer: BuySell,
          },
          price: defaultColumnConfig,
          amount: defaultColumnConfig,
          exchange: defaultColumnConfig,
          profit: {
            sortable: true,
            renderer: ColoredNumber,
            align: 'right',
          },
          txHash: {
            headerText: 'TX Hash',
            align: 'right',
            renderer: ({ children }) => <HexValue short>{children}</HexValue>,
          },
          fee: defaultColumnConfig,
          timestamp: defaultColumnConfig,
        }}
      >
        {data.trades.map(trade => {
          const type =
            trade.sell.token.symbol === data.meta.quoteToken.symbol
              ? 'Buy'
              : 'Sell';
          const pair =
            type === 'Buy'
              ? `${trade.buy.token.symbol}/${trade.sell.token.symbol}`
              : `${trade.sell.token.symbol}/${trade.buy.token.symbol}`;
          const price =
            type === 'Buy'
              ? divide(trade.sell.howMuch, trade.buy.howMuch).toString()
              : divide(trade.buy.howMuch, trade.sell.howMuch).toString();
          const amount =
            type === 'Buy' ? trade.buy.howMuch : trade.sell.howMuch;

          return {
            pair,
            type,
            price: toFixed(price),
            amount: toFixed(amount),
            exchange: trade.exchange.id,
            profit: 0,
            txHash: trade.transaction,
            fee: 'TODO',
            timestamp: format(new Date(trade.timestamp), 'YYYY-MM-DD HH:mm:ss'),
          };
        })}
      </Table>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Trades);