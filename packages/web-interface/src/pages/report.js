import Link from 'next/link';
import { format } from 'date-fns';

import dataExtractor from '@melonproject/data-extractor/dataExtractor';

const Report = ({ data, debug }) => (
  <div>
    <h1>{data.meta.fundName}</h1>
    <h2>
      Report from{' '}
      {format(new Date(data.meta.timeSpanStart * 1000), 'D. MMM YYYY')} to{' '}
      {format(new Date(data.meta.timeSpanEnd * 1000), 'D. MMM YYYY')}
    </h2>
    <pre>{JSON.stringify(data, null, 4)}</pre>
  </div>
);

Report.getInitialProps = async ({ query }) => {
  const data = await dataExtractor(
    query.fundAddress,
    query.timeSpanStart,
    query.timeSpanEnd,
  );
  return data;
};

export default Report;
