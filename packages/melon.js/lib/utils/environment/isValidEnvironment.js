import providers from '../constants/providers';

const isValidEnvironment = environment =>
  typeof environment.api === 'object' &&
  Object.values(providers).includes(environment.providerType);

export default isValidEnvironment;
