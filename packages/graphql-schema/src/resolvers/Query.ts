import { getParityProvider, getPrice } from '@melonproject/melon.js';
import { Context } from '../index';

const price = async (parent, args, context: Context) => {
  const environment = await getParityProvider();
  return getPrice(environment, args.symbol);
};

export default {
  price,
};
