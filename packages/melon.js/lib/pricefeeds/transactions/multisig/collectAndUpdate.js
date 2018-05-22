// @flow
import getCanonicalPriceFeedContract from '../../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';

/**
 * Update canonical pricefeed by collecting median values of all pricefeed operators for each price.
 * This function can only be called by the technical council multisig
 */
const collectAndUpdate = async (environment, { assets }): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const receipt = await sendTransaction(
    canonicalPriceFeedContract,
    'collectAndUpdate',
    [assets],
    environment,
  );

  return receipt;
};

export default collectAndUpdate;
