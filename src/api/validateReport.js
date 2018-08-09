import schema from '~/data/FundReportSchema.json';

import { Validator } from 'jsonschema';

const v = new Validator();

export default function validateReport(dataWithCalculations) {
  const validatorResult = v.validate(dataWithCalculations.data, schema);
  console.log(validatorResult);
  return { ...dataWithCalculations, isValid: validatorResult.valid };
}
