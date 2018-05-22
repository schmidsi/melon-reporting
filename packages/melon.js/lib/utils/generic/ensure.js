// @flow

function EnsureError(message, data) {
  this.name = 'EnsureError';
  this.message = message || 'Ensure failed';
  this.data = data;
  this.stack = new Error().stack;
}
EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

/**
 * Similar to asset but throws on runtime if `condition` isn't met.
 * Possibility to add a `message` and some `data` to trace.
 * @throws {EnsureError}
 */
const ensure = (condition: boolean, message: string, data: any): void => {
  if (condition !== true) {
    throw new EnsureError(message, { condition, data });
  }
};

export default ensure;
