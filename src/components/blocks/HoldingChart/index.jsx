import React from 'react';
import * as R from 'ramda';

import { ComposedChart, Area, Line, Tooltip } from 'recharts';

import { toNumber } from '~/utils/functionalBigNumber';
import withErrorBoundary from '~/components/utils/withErrorBoundary';
import rezipGrayscale from '~/components/utils/rezipGrayscale';

import styles from './styles.css';

const HoldingChart = ({
  width = 960 * (16 / 18),
  height = 494 * (16 / 18),
  data,
}) => {
  if (!data[1]) return <h1>No data</h1>;

  const rezippedGrayscale = rezipGrayscale(R.keys(data[1]));

  return (
    <div className={styles.HoldingChart}>
      <ComposedChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <Tooltip />

        {R.keys(data[1]).map((key, i) => {
          const color = rezippedGrayscale[i];
          return key === 'sharePrice' ? (
            <Line
              key={key}
              dataKey={k => toNumber(k.sharePrice)}
              stroke="#000000"
              dot={false}
              type="stepBefore"
            />
          ) : (
            <Area
              key={key}
              dataKey={key}
              stackId="0"
              stroke={color}
              fill={color}
              type="stepBefore"
            />
          );
        })}
      </ComposedChart>
    </div>
  );
};

export default withErrorBoundary(__dirname)(HoldingChart);
