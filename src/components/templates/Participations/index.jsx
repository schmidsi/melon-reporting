import React from 'react';

import { Heading1 } from '~/components/design/typography';
import { Container } from '~/components/design/layout';
import Table from '~/components/blocks/Table';
import HexValue from '~/components/blocks/HexValue';

const columnConfig = {
  address: {
    renderer: HexValue,
  },
  kyc: {
    sortable: true,
    renderer: a => a, // TODO: TrafficLight
  },
  name: {
    headerText: 'ENS Lookup',
    sortable: true,
  },
  invests: {
    sortable: true,
    verticalHeader: true,
  },
  redeems: {
    sortable: true,
    verticalHeader: true,
  },
  shares: {
    sortable: true,
  },
  value: {
    sortable: true,
  },
};

const prepareInvestorTable = ({ data, calculations }) =>
  data.participations.investors.map(investor => { });

const Participations = ({ data, calculations }) => (
  <div>
    <Container>
      <Heading1>Participations</Heading1>
    </Container>
    <Container>
      <Table columnConfig={columnConfig}>
        {prepareInvestorTable({ data, calculations })}
      </Table>
    </Container>
  </div>
);

export default Participations;
