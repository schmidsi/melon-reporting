import { md as _md } from "node-forge";

export function hashReport(report) {
  // maybe use MD5 which fits into single bytes32 solidity value
  var md = _md.sha256.create();
  md.update(report);
  return "0x" + md.digest().toHex();
}
