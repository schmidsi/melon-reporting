import React from 'react';

import withLoading from './utils/withLoading';
import reportDataGenerator from '~/api/reportDataGenerator';
import FactSheet from '~/components/templates/FactSheet';
import Holdings from '~/components/templates/Holdings';
import Trades from '~/components/templates/Trades';
import Audit from './Audit';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const Report = ({ data, calculations, calculationsHistory }) => (
  <div>
    <FactSheet
      data={data}
      calculations={calculations}
      calculationsHistory={calculationsHistory}
    />
    <Holdings data={data} calculations={calculations} />
    <Trades data={data} calculations={calculations} />
    <Audit data={data} />

    {/* <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre> */}
  </div>
);

const enhance = withLoading(async ({ match: { params } }) => {
  debug('Loading report data ...');

  const res = await reportDataGenerator(
    params.fundAddress,
    params.timeSpanStart,
    params.timeSpanEnd,
  );

  const { data, calculations, calculationsHistory } = res;

  // const calculations = {
  //   sharePrice: 123,
  //   sharePriceHistory: data.holdings[0].priceHistory,
  //   transactionFees: 83.214,
  //   volatility: 19.5,
  //   profit: 5.23,
  //   // TODO: Replace second param with sharePriceHistory
  //   holdingChartData,
  // };

  debug('Report data loaded', res);

  return {
    data,
    calculations,
    calculationsHistory,
  };
});

export default enhance(Report);
