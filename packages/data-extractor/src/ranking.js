import { getParityProvider, getRanking } from '@melonproject/melon.js';

const ranking = async () => {
  const environment = await getParityProvider('https://kovan.melonport.com');
  return getRanking(environment);
};

export default ranking;
