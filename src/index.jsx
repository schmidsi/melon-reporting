import React from 'react';
import ReactDOM from 'react-dom';
import Report from './pages/Report';

const main = async () => {
  const { data, calculations } = await Report.getInitialProps({
    query: {
      fundAddress: '0xbada55',
      timeSpanStart: 1514761200,
      timeSpanEnd: 1522447200,
    },
  });

  console.log({ data, calculations });

  ReactDOM.render(
    <Report data={data} calculations={calculations} />,
    document.getElementById('root'),
  );
};

main();
