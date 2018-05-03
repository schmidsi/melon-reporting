var forge = require('node-forge')

export function hashReport(report) {
  // maybe use MD5 which fits into single bytes32 solidity value
  var md = forge.md.sha256.create();
  md.update(report);
  return md.digest().toHex();
}
