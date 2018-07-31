import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const SharePriceChart = ({ width = 548, height = 314, data }) => (
  <div className={styles.SharePriceChart}>
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis height={1} domain={[0, 'dataMax']} />
      <YAxis width={1} />
      <Tooltip />
      <Line dataKey="sharePrice" stroke="#000000" dot={false} />
    </LineChart>
  </div>
);

export default withErrorBoundary(__dirname)(SharePriceChart);
