import path from 'path';
import React from 'react';
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  renderComponent,
} from 'recompose';

const ErrorMessage = () => (
  <h1>Oops, something went wrong :( Check the console</h1>
);

const withErrorBoundary = namespace =>
  compose(
    withStateHandlers(
      { error: false },
      { onError: () => () => ({ error: true }) },
    ),
    lifecycle({
      componentDidCatch(error, info) {
        const root = path.join(__dirname, '../..');
        console.error(
          'ErrorBoundary:',
          {
            component: path.relative(root, namespace),
            props: this.props,
          },
          error,
        );
        this.props.onError();
      },
    }),
    branch(({ error }) => error, renderComponent(ErrorMessage)),
  );

export default withErrorBoundary;
