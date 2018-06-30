import * as R from 'ramda';

import getDefaultTimeSpan from '@melonproject/data-extractor/getDefaultTimeSpan';

import { default as routes, Router } from '../../routes';

const Redirecter = () => <div />;

Redirecter.getInitialProps = async ({ query, res }) => {
  const defaultTimeSpan = await getDefaultTimeSpan(query.fundAddress);

  const merged = R.merge(defaultTimeSpan, query);

  const target = routes.findByName('report').toPath(merged);

  if (res) {
    res.redirect(target);
  } else {
    Router.push(target);
  }

  return {};
};

export default Redirecter;
