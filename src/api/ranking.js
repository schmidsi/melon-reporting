import { getParityProvider, getRanking } from '@melonproject/melon.js';

const ranking = async () => {
  const environment = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  return getRanking({ ...environment, track: 'kovan-demo' });
};

export default ranking;
