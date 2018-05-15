// @flow
import BigNumber from 'bignumber.js';

const isValidId = (id: BigNumber): boolean =>
  id.toString(16) !==
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' &&
  id.gte(0);

export default isValidId;
