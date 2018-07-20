import * as R from 'ramda';

import getDefaultTimeSpan from '../../api/getDefaultTimeSpan';

import { default as routes, Router } from '../../routes';

const Redirecter = () => <div />;

Redirecter.getInitialProps = async ({ query, res }) => {
  const defaultTimeSpan =
    query.fundAddress === '0xdeadbeef' || query.fundAddress === '0xbada55'
      ? {
          timeSpanStart: 1514761200,
          timeSpanEnd: 1522447200,
        }
      : await getDefaultTimeSpan(query.fundAddress);

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
