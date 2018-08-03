import * as R from 'ramda';

const setPath = (path, setter) => obj => R.assocPath(path, setter(obj), obj);

export default setPath;
