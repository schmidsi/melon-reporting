import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Report from './pages/Report';
import Browse from './pages/Browse';

const main = async () => {
  // const { data, calculations } = await Report.getInitialProps({
  //   query: {
  //     fundAddress: '0xbada55',
  //     timeSpanStart: 1514761200,
  //     timeSpanEnd: 1522447200,
  //   },
  // });

  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Redirect exact from="/" to="/browse" />
        <Route path="/browse" component={Browse} />
        {/* <Report data={data} calculations={calculations} /> */}
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

main();
