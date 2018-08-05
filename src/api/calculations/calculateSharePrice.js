import { divide } from '~/utils/functionalBigNumber';
import setPath from '~/api/utils/setPath';

const calculateSharePrice = () =>
  setPath(['calculations', 'sharePrice'], ({ calculations }) =>
    divide(calculations.aum, calculations.totalSupply),
  );

export default calculateSharePrice;
