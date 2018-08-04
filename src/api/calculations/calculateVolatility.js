import setPath from '~/api/utils/setPath';
import * as math from 'mathjs';

const calculateVolatility = setPath(
  ['calculations', 'volatility'],
  ({ calculationsHistory }) => {
    // calculate continuously compounded return of each period
    const days = calculationsHistory.length - 1;

    const returns = new Array(days - 1); // returns
    for (let i = days; i > 0; i--) {
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
