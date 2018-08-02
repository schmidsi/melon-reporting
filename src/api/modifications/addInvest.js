import { multiply } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const addInvest = ({ value, timestamp, investor }) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor: investor.address,
      token: data.meta.quoteToken,
      type: 'invest',
      value,
      shares: multiply(calculations.sharePrice, value),
      timestamp: timestamp || data.meta.inception,
    },
  ]);

export default addInvest;
