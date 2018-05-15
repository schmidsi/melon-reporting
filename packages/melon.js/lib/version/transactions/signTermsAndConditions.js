import Wallet from 'ethers-wallet';
import Utils from 'ethers-utils';
import ensure from '../../utils/generic/ensure';
import getVersionContract from '../contracts/getVersionContract';

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signTermsAndConditions = async environment => {
  const versionContract = await getVersionContract(environment);
  const arrayifiedHash = await versionContract.instance.TERMS_AND_CONDITIONS.call();

  let rawSignature;

  if (environment.account.signMessage) {
    rawSignature = environment.account.signMessage(arrayifiedHash);
    const verified = Wallet.Wallet.verifyMessage(arrayifiedHash, rawSignature);
    ensure(
      verified.toLowerCase() === environment.account.address.toLowerCase(),
      'Invalid signature of terms and conditions',
      { expected: environment.account.address, received: verified },
    );
  } else {
    const hash = Utils.hexlify(arrayifiedHash);
    rawSignature = await environment.api.eth.sign(
      environment.account.address,
      hash,
    );
  }

  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v: `0x${rawSignature.substring(66 + 64)}`,
  };
};

export default signTermsAndConditions;
