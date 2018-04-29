const schema = require('./FundReportSchema.json');

var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});

var validate = ajv.compile(schema);

export function validateReport(data) {
  var valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}
