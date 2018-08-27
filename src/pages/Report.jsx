import React from 'react';

import withLoading from './utils/withLoading';
import reportDataGenerator from '~/api/reportDataGenerator';
import FactSheet from '~/components/templates/FactSheet';
import Holdings from '~/components/templates/Holdings';
import Trades from '~/components/templates/Trades';
import Participations from '~/components/templates/Participations';
import { Spacer } from '~/components/design/layout/';
// import Audits from '~/components/templates/Audits';
// import auditReport from '~/api/auditReport';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const Report = ({ data, calculations, calculationsHistory }) =>
  data && calculations && calculationsHistory ? (
    <div>
      <FactSheet
        data={data}
        calculations={calculations}
        calculationsHistory={calculationsHistory}
      />
      <Holdings data={data} calculations={calculations} />
      <Trades data={data} calculations={calculations} />
      <Participations
        data={data}
        calculations={calculations}
        calculationsHistory={calculationsHistory}
      />
      {/* <Audits data={data} calculations={calculations} doAudit={auditReport} /> */}

      {/* <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre> */}
      <Spacer height="4" />
    </div>
  ) : (
      <h1>Missing data</h1>
    );

const enhance = withLoading(async ({ match: { params } }) => {
  debug('Loading report data ...');

  const res = await reportDataGenerator(
    params.fundAddress,
    params.timeSpanStart,
    params.timeSpanEnd,
  );

  const { data, calculations, calculationsHistory, isValid } = res;

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
    isValid,
  };
});

export default enhance(Report);
