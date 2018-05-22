import Utils from 'ethers-utils';
import Wallet from 'ethers-wallet';
import ensure from '../../utils/generic/ensure';
import getOlympiadContract from '../contracts/getOlympiadContract';
/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signOlympiadTermsAndConditions = async environment => {
  const olympiadContract = await getOlympiadContract(environment);
  const competitionHash = await olympiadContract.instance.TERMS_AND_CONDITIONS.call();
  // const arrayifiedHash = [
  //   26,
  //   70,
  //   180,
  //   92,
  //   200,
  //   73,
  //   226,
  //   107,
  //   179,
  //   21,
  //   146,
  //   152,
  //   195,
  //   194,
  //   24,
  //   239,
  //   48,
  //   13,
  //   1,
  //   94,
  //   211,
  //   226,
  //   52,
  //   149,
  //   231,
  //   127,
  //   14,
  //   82,
  //   156,
  //   233,
  //   246,
  //   158,
  // ];

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

  const v = parseInt(rawSignature.substring(66 + 64), 16);
  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v,
  };
};

export default signOlympiadTermsAndConditions;
