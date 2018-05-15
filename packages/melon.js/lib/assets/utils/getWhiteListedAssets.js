import Utils from 'ethers-utils';
import tokenInfo from '@melonproject/smart-contracts/utils/info/tokenInfo';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';

/**
 * Gets list of white listed asset pairs on production exchange
 */
const getWhiteListedAssets = async (environment, network) => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const promiseForInfo = Object.keys(tokenInfo[network]).map(async symbol => {
    const asset = tokenInfo[network][symbol];

    const info = await canonicalPriceFeedContract.instance.assetInformation.call(
      {},
      [asset.address],
    );

    return {
      address: asset.address,
      name: Utils.toUtf8String(Utils.stripZeros(info[1].reverse()).reverse()),
      symbol: Utils.toUtf8String(Utils.stripZeros(info[2].reverse()).reverse()),
      decimals: parseInt(info[3], 10),
      url: info[4],
      ipfsHash: info[5],
      isWhiteListed: info[0],
    };
  });

  const allAssetsInfos = await Promise.all(promiseForInfo);

  return allAssetsInfos.filter(asset => asset.isWhiteListed);
};

export default getWhiteListedAssets;
