import Link from 'next/link';

import dataExtractor from '@melonproject/data-extractor/dataExtractor';

import styles, { button } from '../styles/app';

const Report = ({ data, debug }) => (
  <div>
    <style jsx global>
      {styles}
    </style>
    <h1>Report</h1>
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
