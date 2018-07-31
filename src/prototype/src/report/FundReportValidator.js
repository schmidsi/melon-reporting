import schema from './FundReportSchema.json';

const Validator = require('jsonschema').Validator;

const v = new Validator();

export function validateReport(data) {
  return v.validate(data, schema);
}
