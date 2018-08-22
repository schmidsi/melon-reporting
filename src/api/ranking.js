import { getParityProvider, getRanking, tracks } from '@melonproject/melon.js';

const ranking = async () => {
  const environment = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  return getRanking({ ...environment, track: process.env.TRACK });
};

export default ranking;
