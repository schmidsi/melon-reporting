import * as R from 'ramda';
import { areRangesOverlapping, min, max } from 'date-fns';

import setPath from '../../utils/setPath';

import { parseTimestamp, toTimestamp } from '~/utils/timestamp';

export const areTimespansOverlapping = R.curry((a, b) =>
  areRangesOverlapping(
    parseTimestamp(a.timespanStart),
    parseTimestamp(a.timespanEnd),
    parseTimestamp(b.timespanStart),
    parseTimestamp(b.timespanEnd),
  ),
);

export const mergeTimespans = (a, b) => ({
  timespanStart: toTimestamp(
    min(parseTimestamp(a.timespanStart), parseTimestamp(b.timespanStart)),
  ),
  timespanEnd: toTimestamp(
    max(parseTimestamp(a.timespanEnd), parseTimestamp(b.timespanEnd)),
  ),
});

export const reduceOverlappingTimespans = timespans =>
  timespans.reduce((reduced, candidate) => {
    const onlyTimespan = R.pick(['timespanStart', 'timespanEnd']);
    const filtered = reduced.map(onlyTimespan);

    const [overlapping, notOverlapping] = R.partition(
      areTimespansOverlapping(candidate),
      filtered,
    );

    if (overlapping.length === 0) return [candidate, ...notOverlapping];

    const merged = overlapping.map(overlappingAudit =>
      mergeTimespans(overlappingAudit, candidate),
    );

    if (merged.length === 1) return [...merged, ...notOverlapping];

    return [...reduceOverlappingTimespans(merged), ...notOverlapping];
  }, []);

export const calculateAuditedTimespans = setPath(
  ['calculations', 'auditedTimespans'],
  ({ data }) => {
    const audited = reduceOverlappingTimespans(data.audits);

    const gaps = audited
      .sort((a, b) => a.timespanStart - b.timespanStart)
      // eslint-disable-next-line max-params
      .reduce((carry, candidate, i, all) => {
        const lastGap = R.head(carry);
        const rest = R.tail(carry);

        if (lastGap && !lastGap.timespanEnd)
          return [
            {
              timespanStart: lastGap.timespanStart,
              timespanEnd: candidate.timespanStart,
            },
            ...rest,
          ];
        if (i === all.length - 1) return carry;
        if (all.length > 0 && !lastGap)
          return [{ timespanStart: candidate.timespanEnd }, ...rest];
        return rest;
      }, []);

    return { audited, gaps };
  },
);

export default calculateAuditedTimespans;
