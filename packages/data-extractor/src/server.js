import * as match from 'micro-match';
import * as Joi from 'joi';
import { request } from 'https';

import dataExtractor from './dataExtractor';
import ranking from './ranking';

module.exports = async req => {
  const start = Date.now();

  const paramsSchema = Joi.object().keys({
    fundAddress: Joi.string().regex(/^0x(\d|[A-F]|[a-f]){40}$/s),
    timeSpanStart: Joi.number()
      .integer()
      .min(0)
      .max(Date.now() / 1000),
    timeSpanEnd: Joi.number()
      .integer()
      .min(Joi.ref('timeSpanStart'))
      .max(Date.now() / 1000),
  });

  const params = match('/:fundAddress?/:timeSpanStart?/:timeSpanEnd?', req.url);

  const { error, value } = Joi.validate(params, paramsSchema);

  if (error) return error;

  const { fundAddress, timeSpanStart, timeSpanEnd } = value;

  // const fundAddress = '0x7610BC396863eEcDae03440756D992c82821F805';
  const data = fundAddress
    ? await dataExtractor(fundAddress, timeSpanStart, timeSpanEnd)
    : await ranking();
  const end = Date.now();
  const duration = end - start;
  return { data, duration };
};
