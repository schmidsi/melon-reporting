import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';
import titleCase from 'title-case';

import { format as numberFormat } from '~/utils/functionalBigNumber';
import { Heading1 } from '~/components/design/typography';
import { Container } from '~/components/design/layout';
import Table from '~/components/blocks/Table';
import HexValue from '~/components/blocks/HexValue';
import ColorCondition from '~/components/blocks/ColorCondition';

const investorsConfig = {
  address: {
    renderer: HexValue,
  },
  kyc: {
    sortable: true,
    headerText: 'KYC',
    // renderer: a => a, // TODO: TrafficLight
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

const participationsConfig = {
  token: { sortable: true },
  type: { sortable: true, renderer: ColorCondition },
  value: { sortable: true },
  shares: { sortable: true },
  investor: { sortable: true, renderer: HexValue },
  timestamp: { sortable: true },
};

const prepareInvestorTable = ({ data, calculations }) =>
  R.zipWith(R.merge, data.participations.investors, calculations.investors).map(
    investor => ({
      ...investor,
      kyc: 'unknown',
      shares: numberFormat(investor.shares),
      value: numberFormat(investor.value),
    }),
  );

const Participations = ({ data, calculations }) => (
  <div>
    <Container>
      <Heading1>Participations</Heading1>
    </Container>
    <Container>
      <Table columnConfig={investorsConfig}>
        {prepareInvestorTable({ data, calculations })}
      </Table>
    </Container>
    <Container>
      <Heading1>Invests/Redeems</Heading1>
    </Container>
    <Container>
      <Table columnConfig={participationsConfig}>
        {data.participations.list.map(participation => ({
          ...participation,
          type: titleCase(participation.type),
          shares: numberFormat(participation.shares),
          value: numberFormat(participation.value),
          token: participation.token.symbol,
          timestamp: format(
            new Date(participation.timestamp * 1000),
            'YYYY-MM-DD HH:mm:ss',
          ),
        }))}
      </Table>
    </Container>
  </div>
);

export default Participations;
