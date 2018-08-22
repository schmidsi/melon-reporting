import { divide } from '~/utils/functionalBigNumber';
import setPath from '../../utils/setPath';

const calculateSharePrice = () =>
  setPath(['calculations', 'sharePrice'], ({ calculations }) =>
    divide(calculations.aum, calculations.totalSupply),
  );

export default calculateSharePrice;
