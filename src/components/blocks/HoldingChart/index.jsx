import React from 'react';
import * as R from 'ramda';
import { interpolateGreys } from 'd3-scale-chromatic';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import withErrorBoundary from '~/components/utils/withErrorBoundary';

import styles from './styles.css';

const HoldingChart = ({ width = 960, height = 494, data }) => (
  <div className={styles.HoldingChart}>
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      {/* <XAxis dataKey="name" />
    <YAxis /> */}
      <Tooltip />

      {!!data[1] &&
        R.keys(data[1]).map((key, i, tokens) => {
          const color = interpolateGreys((i + 1) / tokens.length);
          return (
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

      {/* <Area
      dataKey={console.log || 'uv'}
      stackId="1"
      stroke="#8884d8"
      fill="#8884d8"
    />
    <Area dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
    <Area dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
    </AreaChart>
  </div>
);

export default withErrorBoundary(__dirname)(HoldingChart);
