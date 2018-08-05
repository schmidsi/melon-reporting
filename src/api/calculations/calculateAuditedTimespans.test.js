/* eslint-env jest */
import {
  areTimespansOverlapping,
  calculateAuditedTimespans,
  reduceOverlappingTimespans,
  mergeTimespans,
  parseTimestamp,
  toTimestamp,
} from './calculateAuditedTimespans';

const january = {
  timespanStart: toTimestamp(new Date(2018, 0, 1)),
  timespanEnd: toTimestamp(new Date(2018, 0, 31)),
};

const february = {
  timespanStart: toTimestamp(new Date(2018, 1, 1)),
  timespanEnd: toTimestamp(new Date(2018, 1, 28)),
};

const march = {
  timespanStart: toTimestamp(new Date(2018, 2, 1)),
  timespanEnd: toTimestamp(new Date(2018, 2, 31)),
};

const q1 = {
  timespanStart: toTimestamp(new Date(2018, 0, 1)),
  timespanEnd: toTimestamp(new Date(2018, 2, 31)),
};

const overlappingJanFeb = {
  timespanStart: toTimestamp(new Date(2018, 0, 20)),
  timespanEnd: toTimestamp(new Date(2018, 1, 5)),
};

test('parseTimestamp', () => {
  const date = new Date(2018, 0, 1);
  const timestamp = toTimestamp(date);
  const parsed = parseTimestamp(timestamp);
  expect(parsed.getTime()).toBe(date.getTime());
});

test('areTimespansOverlapping', () => {
  expect(areTimespansOverlapping(january, february)).toBe(false);
  expect(areTimespansOverlapping(january, march)).toBe(false);
  expect(areTimespansOverlapping(february, january)).toBe(false);
  expect(areTimespansOverlapping(february, march)).toBe(false);
  expect(areTimespansOverlapping(overlappingJanFeb, march)).toBe(false);

  expect(areTimespansOverlapping(january, q1)).toBe(true);
  expect(areTimespansOverlapping(march, q1)).toBe(true);
  expect(areTimespansOverlapping(overlappingJanFeb, january)).toBe(true);
  expect(areTimespansOverlapping(overlappingJanFeb, february)).toBe(true);
});

test('mergeTimespans', () => {
  const janFeb = mergeTimespans(january, february);
  expect(janFeb.timespanStart).toBe(january.timespanStart);
  expect(janFeb.timespanEnd).toBe(february.timespanEnd);
});

describe('reduceOverlappingTimespans', () => {
  test('`january` overlapping with `overlappingJanFeb`', () => {
    const janOverlap = [january, overlappingJanFeb];

    const reduced = reduceOverlappingTimespans(janOverlap);
    expect(reduced.length).toBe(1);
  });

  test('`january` not overlapping with `february`', () => {
    const noOverlap = [january, february];

    const reduced = reduceOverlappingTimespans(noOverlap);
    expect(reduced.length).toBe(2);
  });

  test('`january` not overlapping with `february` and `march`', () => {
    const noOverlap = [january, february, march];

    const reduced = reduceOverlappingTimespans(noOverlap);
    expect(reduced.length).toBe(3);
  });

  test('`january`, `february` and `march` overlapping with `q1`', () => {
    const overlap = [january, february, march, q1];

    const reduced = reduceOverlappingTimespans(overlap);
    expect(reduced.length).toBe(1);
  });

  test('`january`, `february` and `march` overlapping with `overlappingJanFeb`', () => {
    const overlap = [january, february, march, overlappingJanFeb];

    const reduced = reduceOverlappingTimespans(overlap);
    expect(reduced.length).toBe(2);
  });
});

test('calculateAuditedTimespans', () => {
  const data = { audits: [january, february, march, overlappingJanFeb] };

  const { calculations } = calculateAuditedTimespans({ data });

  expect(calculations.auditedTimespans.audited.length).toBe(2);
  expect(calculations.auditedTimespans.gaps.length).toBe(1);

  const gap = calculations.auditedTimespans.gaps[0];

  expect(gap.timespanStart).toBe(february.timespanEnd);
  expect(gap.timespanEnd).toBe(march.timespanStart);
});
