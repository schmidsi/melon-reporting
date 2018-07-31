import BigNumber from 'bignumber.js';

export const toBigNumber = value =>
  new BigNumber(value === '...' ? 0 : value || 0);

export const multiply = (base, ...args) =>
  args
    .reduce(
      (acc, current) => acc.times(toBigNumber(current)),
      toBigNumber(base),
    )
    .toString();

export const add = (base, ...args) =>
  args
    .reduce((acc, current) => acc.plus(toBigNumber(current)), toBigNumber(base))
    .toString();

export const subtract = (base, ...args) =>
  args
    .reduce(
      (acc, current) => acc.minus(toBigNumber(current)),
      toBigNumber(base),
    )
    .toString();

export const divide = (base, ...args) =>
  args
    .reduce((acc, current) => acc.div(toBigNumber(current)), toBigNumber(base))
    .toString();

export const isZero = number => toBigNumber(number).eq(0);

export const greaterThan = (a, b) => toBigNumber(a).gt(b || 0);

export const lessThan = (a, b) => toBigNumber(a).lt(b || 0);

export const equals = (a, b) => toBigNumber(a).eq(b || 0);

export const max = (a, b) => (greaterThan(a, b) ? a : b).toString();

export const min = (a, b) => (greaterThan(a, b) ? b : a).toString();

export const toFixed = (number, decimals = 3) =>
  toBigNumber(number).toFixed(decimals);

export const toNumber = bigNumber => toBigNumber(bigNumber).toNumber();
