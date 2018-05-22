// @flow
import RiskMgmtinterface from '@melonproject/smart-contracts/out/riskmgmt/RMMakeOrders.abi.json';

/**
 * Get deployed risk management contract instance
 */

const getRiskManagementContract = async (environment, fundContract) => {
  const [
    ,
    ,
    RiskMgmtContractAddress,
  ] = await fundContract.instance.getModules.call();
  return environment.api.newContract(
    RiskMgmtinterface,
    RiskMgmtContractAddress,
  );
};

export default getRiskManagementContract;
