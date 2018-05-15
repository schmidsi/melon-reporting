import getNetworkName from '../ethereum/getNetworkName';

let network;

const getNetwork = async environment => {
  if (!network) network = await environment.api.net.version();
  return getNetworkName(network);
};

export default getNetwork;
