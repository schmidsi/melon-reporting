import { md as _md } from "node-forge";

function hashReport(report) {
  var reportAsString = JSON.stringify(report);
  var md = _md.sha256.create();
  md.update(reportAsString);
  return "0x" + md.digest().toHex();
}

export default hashReport;
