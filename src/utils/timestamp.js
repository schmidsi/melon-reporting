export const parseTimestamp = t => new Date(t * 1000);
export const toTimestamp = date => Math.floor(date.getTime() / 1000);
