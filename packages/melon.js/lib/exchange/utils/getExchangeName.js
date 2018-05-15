import addressBook from '@melonproject/smart-contracts/addressBook.json';
import getNetwork from '../../utils/environment/getNetwork';

const getExchangeName = async (environment, exchangeAddress) => {
  const network = await getNetwork(environment);

  switch (exchangeAddress) {
    case addressBook[network].MatchingMarket:
      return 'MatchingMarket';

    case addressBook[network].ZeroExExchange:
      return 'ZeroEx';

    default:
      throw new Error(
        `Exchange name not found for exchange with address ${exchangeAddress}`,
      );
  }
};

export default getExchangeName;
