import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Report from './pages/Report';
import Browse from './pages/Browse';
import RedirectToReport from './pages/RedirectToReport';

import routes from './routes';

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
      <Switch>
        <Redirect exact from="/" to="/browse" />
        <Redirect exact from="/report" to="/browse" />
        <Route path="/browse" component={Browse} />
        <Route path={routes.redirect} component={RedirectToReport} exact />
        {/* <Route path={routes.report} component={Report} /> */}
        {/* <Report data={data} calculations={calculations} /> */}
      </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

main();
