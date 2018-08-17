import schema from '~/data/FundReportSchema.json';
import { Validator } from 'jsonschema';

export default function validateReport(report) {
  const v = new Validator();
  const validatorResult = v.validate(report.data, schema);
  return { ...report, isValid: validatorResult.valid };
}
