/**
 *
 * From https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
 *
:<math> \rho_{X,Y}= \frac{\operatorname{cov}(X,Y)}{\sigma_X \sigma_Y} </math>

::where:
::* <math> \operatorname{cov} </math> is the [[covariance]]
::* <math> \sigma_X </math> is the [[standard deviation]] of  <math> X </math>
::* <math> \sigma_Y </math> is the standard deviation of  <math> Y </math>
 *
 * Inspired from: https://github.com/SeregPie/almete.PearsonCorrelationCoefficient/blob/master/src/index.js
 * But extended
 */

import * as R from 'ramda';
import * as math from 'mathjs';
import { toNumber } from '../../utils/functionalBigNumber';

const pearsonCorrelation = (bigNumX, bigNumY) => {
  const x = bigNumX.map(toNumber);
  const y = bigNumY.map(toNumber);
  const zip = R.zip(x, y);
  const length = R.length(zip);
  const stdX = math.std(x);
  const stdY = math.std(y);

  if (stdX === 0 && stdY === 0) return 1;
  if (stdX === 0 || stdY === 0) return 0;

  const { sumX, sumY, sumXY, sumX2, sumY2 } = zip.reduce(
    ({ sumX, sumY, sumXY, sumX2, sumY2 }, [xi, yi]) => ({
      sumX: sumX + xi,
      sumY: sumY + yi,
      sumXY: sumXY + xi * yi,
      sumX2: sumX2 + xi ** 2,
      sumY2: sumY2 + yi ** 2,
    }),
    { sumX: 0, sumY: 0, sumXY: 0, sumX2: 0, sumY2: 0 },
  );

  return (
    (length * sumXY - sumX * sumY) /
    Math.sqrt((length * sumX2 - sumX * sumX) * (length * sumY2 - sumY * sumY))
  );
};

export default pearsonCorrelation;
