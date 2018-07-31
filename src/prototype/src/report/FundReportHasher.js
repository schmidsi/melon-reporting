import { md as _md } from 'node-forge';

export function hashReport(report) {
  const md = _md.sha256.create();
  md.update(report);
  return `0x${md.digest().toHex()}`;
}
