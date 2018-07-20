import ReportTemplate from '../components/templates/Report';

import dataExtractor from '../api/dataExtractor';

import Audit from './Audit';

const Report = ({ data, debug }) => (
  <div>
    <ReportTemplate data={data} />
    <Audit data={data} />
    <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 4)}</pre>
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
