var forge = require('node-forge')

export function hashReport(report) {
  var md = forge.md.sha256.create();
  md.update(report);
  return md.digest().toHex();
}
