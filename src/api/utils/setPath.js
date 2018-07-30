import * as R from 'ramda';

const setPath = (path, setter) => ({ data, calculations }) =>
  R.assocPath(path, setter({ data, calculations }), { data, calculations });

export default setPath;
