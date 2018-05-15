// @flow
import ComplianceInterfaceAbi from '@melonproject/smart-contracts/out/compliance/ComplianceInterface.abi.json';

/**
 * Get deployed participation contract instance
 */
const getComplianceContract = async (environment, fundContract) => {
  const [
    ,
    ,
    participationContractAddress,
  ] = await fundContract.instance.getModules.call();
  return environment.api.newContract(
    ComplianceInterfaceAbi,
    participationContractAddress,
  );
};

export default getComplianceContract;
