import { getParityProvider, getRanking } from '@melonproject/melon.js';

const ranking = async () => {
  const environment = await getParityProvider();
  return getRanking(environment);
};

export default ranking;
