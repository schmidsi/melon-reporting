import { divide, isZero } from '~/utils/functionalBigNumber';
import setPath from '../../utils/setPath';

const calculateSharePrice = () =>
  setPath(
    ['calculations', 'sharePrice'],
    ({ calculations }) =>
      isZero(calculations.totalSupply)
        ? '1'
        : divide(calculations.aum, calculations.totalSupply),
  );

export default calculateSharePrice;
