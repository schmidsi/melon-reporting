import { mergeAll } from 'ramda';
import isPromise from './isPromise';

const resolvePromiseObject = async obj => {
  const promises = Object.keys(obj).map(
    key =>
      isPromise(obj[key])
        ? obj[key].then(resolved => ({ [key]: resolved }))
        : new Promise(resolve => resolve({ [key]: obj[key] })),
  );

  const resolved = await Promise.all(promises);
  return mergeAll(resolved);
};

export default resolvePromiseObject;
