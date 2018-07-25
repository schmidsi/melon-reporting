import React from 'react';
import FactSheet from '../components/templates/FactSheet';

import withLoading from './utils/withLoading';
import reportDataGenerator from '~/api/reportDataGenerator';
import ColoredNumber from '~/components/blocks/ColoredNumber';
import DescriptionList from '~/components/blocks/DescriptionList';
import Audit from './Audit';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const Report = ({ data, calculations }) => (
  <div>
    <FactSheet data={data} calculations={calculations} />
    <Audit data={data} />
    <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre>
  </div>
);

const enhance = withLoading(async props => {
  const query = props.match.params;

  debug('Loading report data ...');

  const res = await reportDataGenerator(
    query.fundAddress,
    query.timeSpanStart,
    query.timeSpanEnd,
  );

  const { data } = res;
  const calculations = {
    sharePrice: 123,
    sharePriceHistory: data.holdings[0].priceHistory,
  };

  debug('Report data loaded', { ...res, calculations });

  return {
    data,
    calculations,
  };
});

export default enhance(Report);
