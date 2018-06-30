import { getFundInformations, getParityProvider } from '@melonproject/melon.js';

const getDefaultTimeSpan = async fundAddress => {
  const environment = await getParityProvider();
  const informations = await getFundInformations(environment, {
    fundAddress,
  });

  return {
    timeSpanStart: Math.round(
      new Date(informations.inception).getTime() / 1000,
    ),
    timeSpanEnd: Math.round(Date.now() / 1000),
  };
};

export default getDefaultTimeSpan;
