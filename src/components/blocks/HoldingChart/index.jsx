import React from 'react';
import * as R from 'ramda';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];

const HoldingChart = ({ data }) => (
  <AreaChart
    width={600}
    height={400}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    {/* <XAxis dataKey="name" />
    <YAxis /> */}
    <Tooltip />

    {!!data[0] &&
      R.keys(data[0]).map((key, i) => <Area dataKey={key} stackId="1" />)}

    {/* <Area
      dataKey={console.log || 'uv'}
      stackId="1"
      stroke="#8884d8"
      fill="#8884d8"
    />
    <Area dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
    <Area dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
  </AreaChart>
);

export default HoldingChart;
