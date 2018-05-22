// @flow
const requestTypes = {
  INVEST: 0,
  REDEEM: 1,
  FALLBACK_REDEEM: 2,
};

export type RequestType = $Keys<typeof requestTypes>;

export default requestTypes;
