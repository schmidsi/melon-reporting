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
      data={data && data.map(d => ({ d }))}
      margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
    >
      {/* <XAxis dataKey="name" />
      <YAxis width={1} /> */}
      <Tooltip />
      <Line
        dataKey={({ d }) => parseFloat(d, 10) * 100000}
        stroke="#000000"
        dot={false}
      />
    </LineChart>
  </div>
);

export default withErrorBoundary(__dirname)(SharePriceChart);
