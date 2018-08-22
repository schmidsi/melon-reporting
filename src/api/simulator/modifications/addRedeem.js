import { multiply } from '~/utils/functionalBigNumber';
import setPath from '../utils/setPath';

const addRedeem = (shares, timestamp, investor) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor: investor.address,
      token: data.meta.quoteToken,
      type: 'redeem',
      amount: multiply(calculations.sharePrice, shares),
      shares,
      timestamp: timestamp || data.meta.inception,
    },
  ]);

export default addRedeem;
