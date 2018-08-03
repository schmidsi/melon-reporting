import * as R from 'ramda';

const isSameToken = R.curry(
  (a, b) => a.symbol === b.symbol && a.address === b.address,
);

export default isSameToken;
