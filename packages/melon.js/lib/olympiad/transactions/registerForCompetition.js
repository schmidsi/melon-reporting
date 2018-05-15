// @flow
import getConfig from '../../version/calls/getConfig';
import getOlympiadContract from '../contracts/getOlympiadContract';
import getVersionContract from '../../version/contracts/getVersionContract';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';
import toReadable from '../../assets/utils/toReadable';

/**
 * Calling this function will register the sender on the competition contract and will allocate to his fund an amount of MLN in proportion of his buyInValue in ETH.
 */
const registerForCompetition = async (
  environment,
  { fundAddress, signature, buyInValue },
): Promise<any> => {
  const olympiadContract = await getOlympiadContract(environment);

  const isCompetitionActive = await olympiadContract.instance.isCompetitionActive.call();
  ensure(isCompetitionActive, 'Olympiad is inactive.');

  const termsAndConditionsAreSigned = await olympiadContract.instance.termsAndConditionsAreSigned.call(
    {},
    [environment.account.address, signature.v, signature.r, signature.s],
  );
  ensure(termsAndConditionsAreSigned, 'Invalid signature of T&Cs');

  const isWhiteListed = await olympiadContract.instance.isWhitelisted.call({}, [
    environment.account.address,
  ]);

  ensure(
    isWhiteListed,
    'Sender is not whitelisted. Please perform KYC/AML checks with Bitcoin Suisse',
  );

  const currentTotalBuyin = await olympiadContract.instance.currentTotalBuyin.call();
  const totalMaxBuyIn = await olympiadContract.instance.totalMaxBuyIn.call();
  ensure(
    currentTotalBuyin.add(buyInValue).lte(totalMaxBuyIn),
    'Max total buy in has been reached.',
  );

  const CHFValue = await olympiadContract.instance.getCHFValue.call({}, [
    buyInValue,
  ]);
  const whitelistantToMaxBuyin = await olympiadContract.instance.whitelistantToMaxBuyin.call(
    {},
    [environment.account.address],
  );

  ensure(
    CHFValue.lte(whitelistantToMaxBuyin),
    'The buy in amount exceed your max buy in amount (determined by Bitcoin Suisse).',
  );

  const versionContract = await getVersionContract(environment);
  let managerToFund = await versionContract.instance.getFundByManager.call({}, [
    environment.account.address,
  ]);
  ensure(
    fundAddress.toLowerCase() === managerToFund.toLowerCase,
    'Sender must register with a fund he owns.',
  );
  const config = await getConfig(environment);
  const etherBalance = await environment.api.eth
    .getBalance(environment.account.address)
    .then(balance => toReadable(config, balance, config.nativeAssetSymbol));
  ensure(etherBalance.gt(buyInValue), 'Insufficient balance of ether');

  const registeredFundToRegistrant = await olympiadContract.instance.registeredFundToRegistrants.call(
    {},
    [fundAddress],
  );
  const registrantToRegistrantId = await olympiadContract.instance.registrantToRegistrantIds.call(
    {},
    [environment.account.address],
  );
  ensure(
    registeredFundToRegistrant ===
      '0x0000000000000000000000000000000000000000' &&
      registrantToRegistrantId[1] === false,
    'Sender already registered.',
  );

  const receipt = await sendTransaction(
    olympiadContract,
    'registerForCompetition',
    [fundAddress, signature.v, signature.r, signature.s],
    environment,
    { value: buyInValue },
  );

  const registerLog = findEventInLog('Register', receipt);
  return registerLog;
};

export default registerForCompetition;
