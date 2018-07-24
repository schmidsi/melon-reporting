import React from 'react';
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  renderComponent,
} from 'recompose';

import LoadingIndicator from '~/components/blocks/LoadingIndicator';

const withLoading = (loaderFunction, initialState) =>
  compose(
    withStateHandlers(
      {
        loading: true,
        ...initialState,
      },
      {
        loaded: () => data => ({ ...data, loading: false }),
      },
    ),
    lifecycle({
      async componentDidMount() {
        const data = await loaderFunction(this.props);
        this.props.loaded(data);
      },
    }),
    branch(({ loading }) => loading, renderComponent(LoadingIndicator)),
  );

export default withLoading;
