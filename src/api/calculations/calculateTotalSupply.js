import { add, subtract } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const calculateTotalSupply = () =>
  setPath(['calculations', 'totalSupply'], ({ data, calculations }) =>
    data.participations.list.reduce(
      (carry, participation) =>
        participation.type === 'invest'
          ? add(carry, participation.shares)
          : subtract(carry, participation.shares),
      '0',
    ),
  );

export default calculateTotalSupply;
