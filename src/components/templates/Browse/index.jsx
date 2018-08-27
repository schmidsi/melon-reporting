import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Heading1 } from '~/components/design/typography';
import { Container, Spacer } from '~/components/design/layout';
import Table from '~/components/blocks/Table';
import { routes, getPath } from '~/routes';
import withErrorBoundary from '~/components/utils/withErrorBoundary';
import HexValue from '~/components/blocks/HexValue';
import { format as numberFormat } from '~/utils/functionalBigNumber';

import styles from './styles.css';

const Browse = ({ children }) => (
  <div>
    <Container>
      <Heading1>Melon Reporting &amp; Auditing</Heading1>
    </Container>
    <Container>
      <div>
        <p>
          Welcome. Please choose a Melon Fund below to view its report. These
          are the Melon Funds from the recent Naxos olympiad on the main net:{' '}
          <a href="https://olympiad.melon.fund" target="_blank">
            olympiad.melon.fund
          </a>
        </p>

        <p>
          Because the Olympiad Funds do not have enough data to make the report
          meaningful, you can generate a mock fund with our fund simulator:
        </p>
        <Link
          className={styles.button}
          to={getPath(routes.redirect, { fundAddress: '0xbada55' })}
        >
          Generate Mock Report
        </Link>
        <Spacer height={2} />
      </div>
    </Container>
    <Container>
      <Table
        columnConfig={{
          rank: {},
          name: {},
          address: {
            renderer: ({ children }) => (
              <Link to={getPath(routes.redirect, { fundAddress: children })}>
                <HexValue>{children}</HexValue>
              </Link>
            ),
          },
          inception: {
            renderer: ({ children }) => format(children, 'YYYY-MM-DD HH:mm:ss'),
          },
          sharePrice: {
            renderer: ({ children }) => numberFormat(children),
            align: 'right',
          },
        }}
      >
        {children}
      </Table>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Browse);
