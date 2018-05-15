// @flow
import addressBook from '@melonproject/smart-contracts/addressBook.json';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getFundInformations from '../../fund/calls/getFundInformations';
import getNetwork from '../../utils/environment/getNetwork';
import getVersionContract from '../contracts/getVersionContract';
import sendTransaction from '../../utils/parity/sendTransaction';
import type { Address } from '../../assets/schemas/Address';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Basic fund information
 */
type Fund = {
  id: number,
  address: Address,
  name: string,
  inception: number,
};

/**
 * Setup a new fund with `name` and an array of `exchangeNames`  */
const setupFund = async (
  environment: Environment,
  { name, signature, exchangeNames = ['MatchingMarket', 'ZeroExExchange'] },
): Promise<Fund> => {
  const config = await getConfig(environment);
  const { quoteAssetSymbol, complianceAddress, riskManagementAddress } = config;

  const quoteAsset = getAddress(config, quoteAssetSymbol);

  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract(environment, config);

  const isVersionShutDown = await versionContract.instance.isShutDown.call();
  ensure(!isVersionShutDown, 'Version is shut down.');

  const termsAndConditionsAreSigned = await versionContract.instance.termsAndConditionsAreSigned.call(
    { from: environment.account.address },
    [signature.v, signature.r, signature.s],
  );
  ensure(
    termsAndConditionsAreSigned,
    'Invalid signature of terms and conditions on contract level',
  );

  const managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [environment.account.address],
  );

  ensure(
    managerToFunds === '0x0000000000000000000000000000000000000000',
    'Already have a fund',
  );

  const network = await getNetwork(environment);
  const exchanges = exchangeNames.map(
    exchange => addressBook[network][exchange],
  );

  const params = [
    name,
    quoteAsset,
    managementReward,
    performanceReward,
    complianceAddress,
    riskManagementAddress,
    exchanges,
    [getAddress(config, 'MLN-T')],
    signature.v,
    signature.r,
    signature.s,
  ];
  const receipt = await sendTransaction(
    versionContract,
    'setupFund',
    params,
    environment,
  );
  const fundAddedMessage = findEventInLog(
    'FundUpdated',
    receipt,
    'Error during fund creation',
  );
  const logArgs = fundAddedMessage.params;
  const fundAddress = logArgs.ofFund.value;

  const fundInformations = await getFundInformations(environment, {
    fundAddress,
  });

  return {
    address: fundAddress,
    name: fundInformations.name,
    inception: fundInformations.inception,
    modules: fundInformations.modules,
    owner: fundInformations.owner,
  };
};

export default setupFund;
