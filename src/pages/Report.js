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

import reportDataGenerator from '../api/reportDataGenerator';
import ColoredNumber from '../components/blocks/ColoredNumber';
import DescriptionList from '../components/blocks/DescriptionList';
import Audit from './Audit';
import hashReport from '../api/hashReport';

const Report = ({ data, debug }) => (
  <div>
    <h1>{data.meta.fundName}</h1>
    <h2>
      Report from{' '}
      {format(new Date(data.meta.timeSpanStart * 1000), 'D. MMM YYYY')} to{' '}
      {format(new Date(data.meta.timeSpanEnd * 1000), 'D. MMM YYYY')}
    </h2>

    <Audit data={data} />

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

    <DescriptionList>
      {{
        Profit: <ColoredNumber>{123.324}</ColoredNumber>,
        Loss: <ColoredNumber>{-123.324}</ColoredNumber>,
        Address: data.meta.fundAddress,
        'Quote Token': data.meta.quoteToken.symbol,
        'Report Data Hash': hashReport(data),
      }}
    </DescriptionList>
    <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre>
  </div>
);

Report.getInitialProps = async ({ query }) => {
  const data = await reportDataGenerator(
    query.fundAddress,
    query.timeSpanStart,
    query.timeSpanEnd,
  );

  return data;
};

export default Report;
