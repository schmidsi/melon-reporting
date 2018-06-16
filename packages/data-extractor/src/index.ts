import { getParityProvider, getConfig } from '@melonproject/melon.js';

module.exports = async () => {
  const environment = await getParityProvider(
    'https://kovan.infura.io/l8MnVFI1fXB7R6wyR22C ',
  );
  const config = await getConfig(environment);
  return config;
};
