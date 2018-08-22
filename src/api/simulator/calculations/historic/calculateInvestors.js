import { add, subtract, divide, multiply } from '~/utils/functionalBigNumber';
import setPath from '../../utils/setPath';

const updateInvestor = (investor, participation, calculations) => {
  if (investor.address !== participation.investor) return investor;

  const shares = investor.shares || '0';
  const updatedShares =
    participation.type === 'invest'
      ? add(shares, participation.shares)
      : subtract(investor.shares, participation.shares);
  const percentage = divide(updatedShares, calculations.aum);

  const invests =
    participation.type === 'invest'
      ? add(investor.invests, 1)
      : investor.invests || 0;
  const redeems =
    participation.type === 'redeem'
      ? add(investor.redeems, 1)
      : investor.redeems || 0;

  const value = multiply(updatedShares, calculations.sharePrice);

  return {
    ...investor,
    shares: updatedShares,
    percentage,
    invests,
    redeems,
    value,
  };
};

const calculateInvestors = () =>
  setPath(['calculations', 'investors'], ({ data, calculations }) =>
    data.participations.list.reduce(
      (carry, participation) =>
        carry.find(investor => investor.address === participation.investor)
          ? carry.map(investor =>
              updateInvestor(investor, participation, calculations),
            )
          : [
              ...carry,
              { address: participation.address, shares: participation.shares },
            ],
      data.participations.investors,
    ),
  );

export default calculateInvestors;
