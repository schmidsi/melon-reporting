import schema from "./FundReportSchema.json";

import Ajv from "ajv";
var ajv = new Ajv({allErrors: true});

var validate = ajv.compile(schema);

export function validateReport(data) {
  var valid = validate(data);
  return {valid: valid, errors: ajv.errorsText(validate.errors)};
}
