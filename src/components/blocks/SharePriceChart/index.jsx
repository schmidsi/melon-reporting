import React from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';

import { toNumber } from '~/utils/functionalBigNumber';
import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const SharePriceChart = ({
  width = 548 * (16 / 18),
  height = 314 * (16 / 18),
  data,
}) => (
    <div className={styles.SharePriceChart}>
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
      >
        <YAxis
          width={0}
          dataKey={k => toNumber(k.sharePrice)}
          domain={[0, dataMax => dataMax * 1.1]}
        />
        <Tooltip />
        <Line dataKey="sharePrice" stroke="#000000" dot={false} />
      </LineChart>
    </div>
  );

export default withErrorBoundary(__dirname)(SharePriceChart);
