import React from 'react';
import * as R from 'ramda';

import withLoading from './utils/withLoading';
import reportDataGenerator from '~/api/reportDataGenerator';
import ColoredNumber from '~/components/blocks/ColoredNumber';
import DescriptionList from '~/components/blocks/DescriptionList';
import FactSheet from '~/components/templates/FactSheet';
import Holdings from '~/components/templates/Holdings';
import Audit from './Audit';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const Report = ({ data, calculations }) => (
  <div>
    <FactSheet data={data} calculations={calculations} />
    <Audit data={data} />
    <Holdings data={data} calculations={calculations} />

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
    transactionFees: 83.214,
    volatility: 19.5,
    // Nice to have: Refactor with xprod: R.splitEvery(l2.length, R.xprod(l1, l2))
    tokenCorrelation: data.holdings.map((rowHolding, rowIndex) =>
      R.mergeAll(
        data.holdings.map((colHolding, colIndex) =>
          R.cond([
            [
              () => colIndex > rowIndex,
              () => ({ [colHolding.token.symbol]: '' }),
            ],
            [
              () => colIndex === rowIndex,
              () => ({ [colHolding.token.symbol]: '-' }),
            ],
            [
              () => true,
              () => ({
                [colHolding.token.symbol]: (Math.random() * 2 - 1).toFixed(2),
              }),
            ],
          ])(),
        ),
      ),
    ),
  };

  debug('Report data loaded', { ...res, calculations });

  return {
    data,
    calculations,
  };
});

export default enhance(Report);
