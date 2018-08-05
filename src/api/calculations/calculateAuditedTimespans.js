import * as R from 'ramda';
import { areRangesOverlapping, min, max } from 'date-fns';

import setPath from '~/api/utils/setPath';

export const parseTimestamp = t => new Date(t * 1000);
export const toTimestamp = date => Math.floor(date.getTime() / 1000);

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
    const [overlapping, notOverlapping] = R.partition(
      areTimespansOverlapping(candidate),
      reduced,
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

    // eslint-disable-next-line max-params
    const gaps = audited.reduce((carry, candidate, i, all) => {
      const lastGap = R.head(carry);
      const rest = R.tail(carry);

      if (!lastGap) return [{ timespanStart: candidate.timespanEnd }];
      if (!lastGap.timespanEnd)
        return [{ ...lastGap, timespanEnd: candidate.timespanStart }, ...rest];
      if (i === all.length - 1) return carry;
      return [{ timespanStart: candidate.timespanEnd }, ...rest];
    }, []);

    return { audited, gaps };
  },
);

export default calculateAuditedTimespans;
