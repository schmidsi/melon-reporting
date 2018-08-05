import React from 'react';
import { format } from 'date-fns';

import { Heading1 } from '~/components/design/typography';
import { Container, PageBreak } from '~/components/design/layout';
import HexValue from '~/components/blocks/HexValue';
import Table from '~/components/blocks/Table';
import AuditChart from '~/components/blocks/AuditChart';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

const Audits = ({ data, calculations }) => (
  <div>
    <PageBreak />
    <Container>
      <Heading1>Audits</Heading1>
    </Container>
    <Container>
      <AuditChart
        start={data.meta.timeSpanStart}
        end={data.meta.timeSpanEnd}
        greenTimeSpans={calculations.auditedTimespans.audited}
        redTimeSpans={calculations.auditedTimespans.gaps}
      >
        {data.audits}
      </AuditChart>
    </Container>
    <Container>
      <Table
        columnConfig={{
          timespanStart: {
            sortable: true,
          },
          timespanEnd: {
            sortable: true,
          },
          auditor: {
            sortable: true,
          },
          opinion: {
            sortable: true,
          },
          dataHash: {
            renderer: ({ children }) => <HexValue short>{children}</HexValue>,
          },
          // timestamp: {
          //   sortable: true,
          //   align: 'right',
          // },
        }}
      >
        {data.audits.map(audit => ({
          ...audit,
          auditor: audit.auditor.name,
          timespanStart: format(
            new Date(audit.timespanStart * 1000),
            'YYYY-MM-DD HH:mm:ss',
          ),
          timespanEnd: format(
            new Date(audit.timespanEnd * 1000),
            'YYYY-MM-DD HH:mm:ss',
          ),
          timestamp: format(
            new Date(audit.timestamp * 1000),
            'YYYY-MM-DD HH:mm:ss',
          ),
        }))}
      </Table>
    </Container>
  </div>
);

export default withErrorBoundary(__dirname)(Audits);
