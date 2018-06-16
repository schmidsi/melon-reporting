import {
  getParityProvider,
  getConfig,
  performCalculations,
  getFundInformations,
  getHoldingsAndPrices,
} from '@melonproject/melon.js';
import * as match from 'micro-match';
import * as Joi from 'joi';

module.exports = async req => {
  console.log(req.url);

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

  console.log(params, error, value);

  if (error) return error;

  const fundAddress = '0x7610BC396863eEcDae03440756D992c82821F805';

  const environment = await getParityProvider('https://kovan.melonport.com');
  // 'https://kovan.melonport.com' ~ 605ms
  // 'https://kovan.infura.io/l8MnVFI1fXB7R6wyR22C' ~ 2000ms
  const config = await getConfig(environment);
  const calculations = await performCalculations(environment, {
    fundAddress,
  });

  const informations = getFundInformations(environment, {
    fundAddress,
  });

  const holdings = await getHoldingsAndPrices(environment, {
    fundAddress,
  }).then(h =>
    h.map(holding => ({
      symbol: holding.name,
      price: holding.price,
      balance: holding.balance,
      fraction: holding.balance.eq(0)
        ? 0
        : calculations.nav.div(holding.balance.times(holding.price)),
    })),
  );

  const end = Date.now();
  const duration = end - start;
  return { config, informations, calculations, holdings, duration };
};
