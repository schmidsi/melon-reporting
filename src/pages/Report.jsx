import React from 'react';
import ReportTemplate from '../components/templates/Report';

import withLoading from './utils/withLoading';
import reportDataGenerator from '../api/reportDataGenerator';
import ColoredNumber from '../components/blocks/ColoredNumber';
import DescriptionList from '../components/blocks/DescriptionList';
import Audit from './Audit';

const Report = ({ data, calculations }) => (
  <div>
    <ReportTemplate data={data} calculations={calculations} />
    <Audit data={data} />
    <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre>
  </div>
);

const enhance = withLoading(async props => {
  const query = props.match.params;

  const { data, debug } = await reportDataGenerator(
    query.fundAddress,
    query.timeSpanStart,
    query.timeSpanEnd,
  );

  console.log({ debug, data });

  return { data, calculations: { sharePrice: 123 } };
});

export default enhance(Report);
