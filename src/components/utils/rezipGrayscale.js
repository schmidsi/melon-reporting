import * as R from 'ramda';
import { interpolateGreys } from 'd3-scale-chromatic';

const rezipGrayscale = arr => {
  const greys = arr.map((_, i) => interpolateGreys((i + 1) / arr.length));

  const [firstGreys, lastGreys] = R.splitAt(
    Math.round(greys.length / 2),
    greys,
  );

  const rearrangedGreys = R.flatten(R.zip(firstGreys, lastGreys));
  return rearrangedGreys;
};

export default rezipGrayscale;
