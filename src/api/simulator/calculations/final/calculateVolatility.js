import * as math from 'mathjs';
import setPath from '../../utils/setPath';

const calculateVolatility = setPath(
  ['calculations', 'volatility'],
  ({ calculationsHistory }) => {
    if (calculationsHistory.length <= 1) {
      // only compute volatility for funds older than one day
      return 0;
    }

    // calculate continuously compounded return of each period
    const days = calculationsHistory.length - 1;

    const returns = new Array(days - 1);
    for (let i = days; i > 0; i -= 1) {
      const C = parseFloat(calculationsHistory[i].sharePrice);
      const Cprevious = parseFloat(calculationsHistory[i - 1].sharePrice);
      returns[i - 1] = math.log(C / Cprevious); // naturalis is standard in mathjs
    }

    // standard deviation of the returns
    const returnsAverage = math
      .chain(returns)
      .mean()
      .done();

    const squaredDeviations = returns.map(r =>
      math
        .chain(r)
        .subtract(returnsAverage)
        .square()
        .done(),
    );

    // average of the squared deviations
    const summedSquaredDeviations = math.sum(squaredDeviations);
    const averageOfSquaredDeviations = math.divide(
      summedSquaredDeviations,
      math.subtract(days, 1),
    );

    const standardDeviation = math.nthRoot(averageOfSquaredDeviations, 2);

    return standardDeviation;
  },
);

export default calculateVolatility;
