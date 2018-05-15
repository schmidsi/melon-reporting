import VersionAbi from '@melonproject/smart-contracts/out/version/Version.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Get deployed version contract instance
 */
const getVersionContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(VersionAbi, config.versionAddress);
};

export default getVersionContract;
