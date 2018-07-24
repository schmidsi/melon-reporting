import * as R from 'ramda';
import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Redirect } from 'react-router-dom';

import withLoading from './utils/withLoading';
import getDefaultTimeSpan from '~/api/getDefaultTimeSpan';
import routes from '~/routes';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const RedirectToReport = ({ to }) => <Redirect to={to} />;

const enhance = withLoading(async props => {
  const query = props.match.params;

  const toPath = pathToRegexp.compile(routes.report);

  const isMockData =
    query.fundAddress === '0xdeadbeef' || query.fundAddress === '0xbada55';

  debug('Calculate redirect target ...', { isMockData, query });

  const defaultTimeSpan = isMockData
    ? {
        timeSpanStart: 1514761200,
        timeSpanEnd: 1522447200,
      }
    : await getDefaultTimeSpan(query.fundAddress);

  const merged = R.mergeWith((a, b) => a || b, query, defaultTimeSpan);
  const to = toPath(merged);

  debug('Redirecting to', to);

  return { to };
});

export default enhance(RedirectToReport);
