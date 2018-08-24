import { multiply } from '~/utils/functionalBigNumber';
import setPath from '../utils/setPath';

const addInvest = ({ value, timestamp, investor, token, shares }) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor: investor.address,
      token: token || data.meta.quoteToken,
      type: 'invest',
      value,
      shares: shares || multiply(calculations.sharePrice, value),
      timestamp: timestamp || data.meta.inception,
    },
  ]);

export default addInvest;
