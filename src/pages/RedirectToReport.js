import * as R from 'ramda';
import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Redirect } from 'react-router-dom';

import withLoading from './utils/withLoading';
import getDefaultTimeSpan from '../api/getDefaultTimeSpan';
import routes from '../routes';

const RedirectToReport = ({ to }) => <Redirect to={to} />;

const enhance = withLoading(async props => {
  const query = props.match.params;

  const toPath = pathToRegexp.compile(routes.report);

  const defaultTimeSpan =
    query.fundAddress === '0xdeadbeef' || query.fundAddress === '0xbada55'
      ? {
          timeSpanStart: 1514761200,
          timeSpanEnd: 1522447200,
        }
      : await getDefaultTimeSpan(query.fundAddress);

  const merged = R.mergeWith((a, b) => a || b, query, defaultTimeSpan);

  return { to: toPath(merged) };
});

export default enhance(RedirectToReport);
