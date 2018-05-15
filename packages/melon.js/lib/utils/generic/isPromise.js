const isPromise = obj => obj && typeof obj.then === 'function';

export default isPromise;
