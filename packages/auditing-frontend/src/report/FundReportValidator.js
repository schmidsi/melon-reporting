import schema from "./FundReportSchema.json";

var Validator = require('jsonschema').Validator;
var v = new Validator();

export function validateReport(data) {
  return v.validate(data, schema);
}
