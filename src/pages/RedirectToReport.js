import * as R from 'ramda';
import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Redirect } from 'react-router-dom';
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  renderComponent,
} from 'recompose';

import LoadingIndicator from '../components/blocks/LoadingIndicator';
import getDefaultTimeSpan from '../api/getDefaultTimeSpan';
import routes from '../routes';

const RedirectToReport = ({ to }) => <Redirect to={to} />;

const enhance = compose(
  withStateHandlers(
    {
      loading: true,
      to: null,
    },
    {
      setTo: () => to => ({ to, loading: false }),
    },
  ),
  lifecycle({
    async componentDidMount() {
      const query = this.props.match.params;
      const toPath = pathToRegexp.compile(routes.report);

      const defaultTimeSpan =
        query.fundAddress === '0xdeadbeef' || query.fundAddress === '0xbada55'
          ? {
              timeSpanStart: 1514761200,
              timeSpanEnd: 1522447200,
            }
          : await getDefaultTimeSpan(query.fundAddress);

      const merged = R.mergeWith((a, b) => a || b, query, defaultTimeSpan);

      this.props.setTo(toPath(merged));
    },
  }),
  branch(({ loading }) => loading, renderComponent(LoadingIndicator)),
);

export default enhance(RedirectToReport);
