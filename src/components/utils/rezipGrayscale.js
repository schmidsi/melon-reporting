import * as R from 'ramda';
import { interpolateGreys } from 'd3-scale-chromatic';

const rezipGrayscale = arr => {
  const greys = arr.map((_, i) => interpolateGreys((i + 1) / arr.length));

  const [firstGreys, lastGreys] = R.splitAt(
    Math.round(greys.length / 2),
    greys,
  );

  const last = R.last(firstGreys);

  const rearrangedGreys = R.flatten(R.zip(firstGreys, lastGreys));

  // R.zip discards the elements of the longer array so we need to add it
  // manually
  if (arr.length % 2) {
    return [...rearrangedGreys, last];
  }

  return rearrangedGreys;
};

export default rezipGrayscale;
