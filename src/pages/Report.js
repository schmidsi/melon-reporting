import Link from 'next/link';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import dataExtractor from '../api/dataExtractor';
import ColoredNumber from '../components/blocks/ColoredNumber';

const Report = ({ data, debug }) => (
  <div>
    <h1>{data.meta.fundName}</h1>
    <h2>
      Report from{' '}
      {format(new Date(data.meta.timeSpanStart * 1000), 'D. MMM YYYY')} to{' '}
      {format(new Date(data.meta.timeSpanEnd * 1000), 'D. MMM YYYY')}
    </h2>
    <LineChart
      width={600}
      height={300}
      data={data.holdings[0].priceHistory}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey={r => parseFloat(r, 10) * 100000}
        stroke="#8884d8"
        dot={false}
      />
    </LineChart>
    <ColoredNumber>{123.324}</ColoredNumber>
    <pre>{JSON.stringify(data, null, 4)}</pre>
  </div>
);

Report.getInitialProps = async ({ query }) => {
  const data = await dataExtractor(
    query.fundAddress,
    query.timeSpanStart,
    query.timeSpanEnd,
  );
  console.log(data);
  return data;
};

export default Report;
