import { multiply } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const addInvest = ({ amount, timestamp, investor }) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor,
      token: data.meta.quoteToken,
      type: 'invest',
      amount,
      shares: multiply(calculations.sharePrice, amount),
      timestamp: timestamp || data.meta.inception,
    },
  ]);

export default addInvest;
