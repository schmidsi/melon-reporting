import { getParityProvider, getRanking } from '@melonproject/melon.js';

const ranking = async () => {
  const environment = await getParityProvider();
  return getRanking({ ...environment, track: "kovan-demo" });
};

export default ranking;
