// @flow
const requestStatus = {
  ACTIVE: 0,
  CANCELLED: 1,
  EXECUTED: 2,
};

export type RequestStatus = $Keys<typeof requestStatus>;

export default requestStatus;
