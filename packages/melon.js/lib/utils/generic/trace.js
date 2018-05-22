// @flow
type Trace = {
  message: string,
  category: 'trace' | 'log' | 'warn' | 'error' | 'debug',
  data: any,
};

/**
 * Helper function to unveil internals of melon.js for logging
 */
const trace = ({ message, category = 'trace', data }: Trace): void => {
  const newTrace = { timestamp: new Date(), message, category, data };
  // setup.tracer(newTrace);
  console.log(newTrace.timestamp, newTrace.category, newTrace.message);
};

const overloading = (...args) => {
  if (typeof args[0] === 'string') {
    const [message, data, category] = args;
    trace({ message, data, category });
  } else {
    trace(args[0]);
  }
};

overloading.log = (message: string, data: any) =>
  trace({ message, data, category: 'log' });

overloading.warn = (message: string, data: any) =>
  trace({ message, data, category: 'warn' });

export default overloading;
