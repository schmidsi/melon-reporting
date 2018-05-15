import OlympiadContract from '@melonproject/smart-contracts/out/competitions/Competition.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
const getOlympiadContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(OlympiadContract, config.olympiadAddress);
};

export default getOlympiadContract;
