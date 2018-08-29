import React from 'react';
import { format } from 'date-fns';

import { Heading1 } from '~/components/design/typography';
import { Container, PageBreak } from '~/components/design/layout';
import ColorCondition from '~/components/blocks/ColorCondition';
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
    <PageBreak />
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
            renderer: ColorCondition,
          },
          price: defaultColumnConfig,
          amount: defaultColumnConfig,
          exchange: defaultColumnConfig,
          // TODO: enable profit
          // profit: {
          //   sortable: true,
          //   renderer: ColorCondition,
          //   align: 'right',
          // },
          txHash: {
            headerText: 'TX Hash',
            align: 'right',
            renderer: ({ children }) =>
              children ? (
                <a
                  href={`https://${process.env.TRACK === 'kovan-demo' &&
                    'kovan.'}etherscan.io/tx/${children}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HexValue short>{children}</HexValue>
                </a>
              ) : (
                'unknown'
              ),
          },
          // TODO: enable fee
          // fee: defaultColumnConfig,
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
            exchange: trade.exchange.name,
            profit: 0,
            txHash: trade.transaction,
            fee: 'TODO',
            timestamp: format(
              new Date(trade.timestamp * 1000),
              'YYYY-MM-DD HH:mm:ss',
            ),
          };
        })}
      </Table>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Trades);
