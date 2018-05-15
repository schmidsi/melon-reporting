import Api from '@parity/api';
import protocolPackage from '@melonproject/smart-contracts/package.json';
import pkg from '../../../package.json';
import providers from '../constants/providers';
import ensure from '../generic/ensure';

const checkHttpProvider = async (url, connectionTimeout) => {
  try {
    const provider = new Api.Provider.Http(url, connectionTimeout);
    const api = new Api(provider);
    // HACK: Parity does not properly return api.isConnected. This is always true.
    // So we need to explicitly make a call that fails for a unreachable node. :(
    await api.net.version();
    return { api, provider };
  } catch (e) {
    console.warn('Error with provider at', url, e);
    return false;
  }
};

const findHttpProvider = (rpcEndpointList, connectionTimeout) =>
  rpcEndpointList.reduce(async (lastPromise, { type, url }) => {
    const lastType = await lastPromise;

    if (lastType) return lastType;

    const candidate = await checkHttpProvider(url, connectionTimeout);

    return candidate ? { ...candidate, providerType: type } : false;
  }, new Promise(resolve => resolve(false)));

/**
 * Finds a parity provider according to the detected environment:
 * - Browser with Parity Dapp / Parity Signer Extension: Secure
 * - Browser without: Unsecure with in-browser signer (ethers) --> Shall not
 *   connect to local node which chould be connected to main net.
 * - Node.js environment: Can connect to localhost or kovan as fallback.
 *   (Maybe also mainnode in the future)
 *
 * @returns Object {
 *  api: [Parity API instance],
 *  provider: [Parity Provider Instance],
 *  providerType: [f.e. providers.Parity],
 * }
 */
const getParityProvider = async connectionTimeout => {
  ensure(
    protocolPackage.version ===
      pkg.dependencies['@melonproject/smart-contracts'],
    'Fatal: Inconsistency: Protocol version mismatch',
  );

  const injectedProvider =
    global.ethereum && global.ethereum.isParity
      ? global.ethereum
      : global.ethereumProvider;

  const rpcEndpointList = [
    {
      type: providers.HOSTED,
      url: 'https://kovan.melonport.com',
    },
  ];

  if (process && process.title.includes('node')) {
    rpcEndpointList.unshift({
      type: providers.LOCAL,
      url: 'http://localhost:8545',
    });
  }

  const provider = injectedProvider
    ? {
        provider: injectedProvider,
        api: new Api(injectedProvider),
        providerType: providers.INJECTED,
      }
    : findHttpProvider(rpcEndpointList, connectionTimeout);

  return provider || { providerType: providers.NONE };
};

export default getParityProvider;
