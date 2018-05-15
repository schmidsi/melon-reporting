import Api from '@parity/api';
import BigNumber from 'bignumber.js';

// This function is taken from parity/js-api. It is included inside the contract object so that it does not work with user transactions
const waitForTransaction = async (api, txhash) => {
  return api.pollMethod('eth_getTransactionReceipt', txhash, receipt => {
    if (!receipt || !receipt.blockNumber || receipt.blockNumber.eq(0)) {
      return false;
    }

    return true;
  });
};

const sendEther = async (environment, { to, amount, opt }) => {
  const nonce = environment.account.sign
    ? (await environment.api.eth.getTransactionCount(
        environment.account.address,
      )).toNumber()
    : undefined;

  if (amount == undefined) {
    throw Error('Amount not found');
  }

  if (to == undefined) {
    throw Error('To address not found');
  }

  // Prepare raw transaction
  const rawTransaction = {
    from: environment.account.address,
    to: to,
    gasPrice: 60000000000,
    value: '0x' + new BigNumber(amount).toString(16),
    ...opt,
  };

  // HACK: If external parity signer, no need to set the nonce, Parity does it. If in-browser wallet, we need to explicitly set the nonce.
  if (nonce) rawTransaction.nonce = nonce;

  // Estimate and adjust gas with gasBoost
  const gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';

  const gasEstimation = await environment.api.eth.estimateGas(rawTransaction);
  rawTransaction[gasKeyName] = '0x' + gasEstimation.toString(16);

  let transactionHash;

  if (environment.account.sign) {
    // Sign transaction object with Wallet instance
    const signedTransaction = environment.account.sign(rawTransaction);

    // Send raw signed transaction and wait for receipt
    transactionHash = await environment.api.eth.sendRawTransaction(
      signedTransaction,
    );
  } else {
    // Send raw transaction object and wait for receipt
    transactionHash = await environment.api.eth.sendTransaction(rawTransaction);
  }

  let res = await waitForTransaction(environment.api, transactionHash);
  if (res == false) {
    throw Error(`It could not get transaction receipt`);
  }
};

export default sendEther;
