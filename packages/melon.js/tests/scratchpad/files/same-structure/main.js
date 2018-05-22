import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getPrice from '../../../../lib/pricefeeds/calls/getPrice';
import getConfig from '../../../../lib/version/calls/getConfig';

import hasRecentPrice from '../../../../lib/pricefeeds/calls/hasRecentPrice';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';

it('Scratchpad', async () => {
  console.log('Starting scratchpad ... \n\n');
  const environment = await getParityProvider(-1);

  // const ranking = await getRanking(environment);

  // console.log(ranking);

  console.log(environment.providerType);

  const config = await getConfig(environment);
  console.log(config);

  const result = await getQuoteAssetSymbol(environment);

  console.log(result);

  const price = await getPrice(environment, result);

  const rcp = await hasRecentPrice(environment);

  console.log(result, price.toString(), rcp);

  const orderbook = await getOrderbook(environment, {
    baseTokenSymbol: 'MKR-T-M',
    quoteTokenSymbol: 'MLN-T-M',
  });
  console.log(orderbook);
});
