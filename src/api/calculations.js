import { toBigNumber, add, multiply } from '../utils/functionalBigNumber';

const calculateAumHistory = dailyHoldings => {
  //const aumHistory = [];

  //dailyHoldings.forEach(day => {});
  return dailyHoldings.map(holdingsOfDay => {
    return holdingsOfDay.reduce((aum, holding) => {
      return add(aum, multiply(holding.quantity, holding.price));
    }, toBigNumber(0));
  });
};

export { calculateAumHistory };
