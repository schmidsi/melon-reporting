import * as R from 'ramda';

import exampleData from '~/data/example-report-data.json';

const sharePrice = [10, 12, 15, 12, 18, 17, 20];

const percentage = {
  MLN: [0.4, 0.4, 0.5, 0.5, 0.6, 0.5, 0.5],
  ETH: [0.2, 0.3, 0.3, 0.2, 0.3, 0.2, 0.2],
  MKR: [0.3, 0.2, 0.1, 0.2, 0.1, 0.1, 0.2],
  ZRX: [0.1, 0.1, 0.1, 0.1, 0.0, 0.2, 0.1],
};

const effective = R.fromPairs(
  R.toPairs(percentage).map(([symbol, history]) => [
    symbol,
    R.zipWith(R.multiply, sharePrice, history),
  ]),
);

const labelArray = (label, array) => array.map(item => ({ [label]: item }));

const holdingChartData = R.toPairs(effective).reduce(
  (carry, [key, value]) => R.zipWith(R.merge, carry, labelArray(key, value)),
  labelArray('sharePrice', sharePrice),
);

export default holdingChartData;
