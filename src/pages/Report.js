import ReportTemplate from '../components/templates/Report';

import reportDataGenerator from '../api/reportDataGenerator';
import ColoredNumber from '../components/blocks/ColoredNumber';
import DescriptionList from '../components/blocks/DescriptionList';
import Audit from './Audit';

const Report = ({ data, debug }) => (
  <div>
    <ReportTemplate data={data} />
    <Audit data={data} />
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
