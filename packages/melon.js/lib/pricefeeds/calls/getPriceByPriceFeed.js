// @flow
import getStakingPriceFeedContract from '../contracts/getStakingPriceFeedContract';
import getConfig from '../../version/calls/getConfig';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';

const getPriceByPriceFeed = async (
  environment,
  { priceFeed, tokenAddr },
): Promise<any> => {
  const config = await getConfig(environment);

  const stakingPricefeedContract = await getStakingPriceFeedContract(
    environment,
    priceFeed,
  );

  const [price, ,] = await stakingPricefeedContract.instance.getPrice.call({}, [
    tokenAddr,
  ]);

  const symbol = await getSymbol(config, tokenAddr);
  return toReadable(config, price, symbol);
};

export default getPriceByPriceFeed;
