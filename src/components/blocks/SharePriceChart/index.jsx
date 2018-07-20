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

import css from './styles.css';

const SharePriceChart = ({ width = 548, height = 314, data }) => (
  <div className={css.SharePriceChart}>
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis dataKey="name" />
      <YAxis width={1} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey={r => parseFloat(r, 10) * 100000}
        stroke="#000000"
        dot={false}
      />
    </LineChart>
  </div>
);

export default SharePriceChart;
