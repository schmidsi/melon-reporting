import providers from '../constants/providers';

const isExternalSigner = environment =>
  environment.providerType === providers.INJECTED;

export default isExternalSigner;
