import { add, subtract, divide } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const updateInvestor = (investor, participation, aum) => {
  if (investor.address !== participation.investor) return investor;

  const shares = investor.shares || '0';
  const updatedShares =
    participation.type === 'invest'
      ? add(shares, participation.shares)
      : subtract(investor.shares, participation.shares);
  const percentage = divide(updatedShares, aum);

  return {
    ...investor,
    shares: updatedShares,
    percentage,
  };
};

const calculateInvestors = () =>
  setPath(['calculations', 'investors'], ({ data, calculations }) =>
    data.participations.list.reduce(
      (carry, participation) =>
        carry.find(investor => investor.address === participation.investor)
          ? carry.map(investor =>
              updateInvestor(investor, participation, calculations.aum),
            )
          : [
              ...carry,
              { address: participation.address, shares: participation.shares },
            ],
      data.participations.investors,
    ),
  );

export default calculateInvestors;
