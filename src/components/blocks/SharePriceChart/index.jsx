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

import * as css from './styles.css';

const SharePriceChart = ({ width = 548, height = 314, data }) => (
  <LineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
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
);

export default SharePriceChart;
