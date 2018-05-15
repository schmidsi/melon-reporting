import getConfig from '../../version/calls/getConfig';
import getBalance from '../../assets/calls/getBalance';
import getPrice from '../../pricefeeds/calls/getPrice';

const getHoldingsAndPrices = async (environment, { fundAddress }) => {
  const config = await getConfig(environment);
  const promiseForHoldingsAndPrices = config.assets.map(async asset => {
    const balance = await getBalance(environment, {
      tokenSymbol: asset.symbol,
      ofAddress: fundAddress,
    });
    const price = await getPrice(environment, asset.symbol);
    return { name: asset.symbol, balance, price };
  });

  const holdingsAndPrices = await Promise.all(promiseForHoldingsAndPrices);
  return holdingsAndPrices;
};

export default getHoldingsAndPrices;
