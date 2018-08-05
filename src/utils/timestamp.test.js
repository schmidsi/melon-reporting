/* eslint-env jest */
import { parseTimestamp, toTimestamp } from './timestamp';

test('parseTimestamp', () => {
  const date = new Date(2018, 0, 1);
  const timestamp = toTimestamp(date);
  const parsed = parseTimestamp(timestamp);
  expect(parsed.getTime()).toBe(date.getTime());
});
