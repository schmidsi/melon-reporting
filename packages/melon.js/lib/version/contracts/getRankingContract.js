import RankingAbi from '@melonproject/smart-contracts/out/FundRanking.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Get deployed version contract instance
 */
const getRankingContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(RankingAbi, config.rankingAddress);
};

export default getRankingContract;
