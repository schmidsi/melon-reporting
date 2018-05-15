// @flow
import gasBoost from '../ethereum/gasBoost';
import constructTransactionObject from './constructTransactionObject';

const sendTransaction = async (
  contract,
  method,
  parameters,
  environment,
  opt = {},
) => {
  const nonce = environment.account.sign
    ? (await environment.api.eth.getTransactionCount(
        environment.account.address,
      )).toNumber()
    : undefined;

  // Prepare raw transaction
  const options = {
    from: environment.account.address,
    to: contract.address,
    gasPrice: 60000000000,
    ...opt,
  };

  // HACK: If external parity signer, no need to set the nonce, Parity does it. If in-browser wallet, we need to explicitly set the nonce.
  if (nonce) options.nonce = nonce;

  // Estimate and adjust gas with gasBoost
  const gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';

  if (
    [
      'cancelOrder',
      'offer',
      'depositStake',
      'withdrawStake',
      'collectAndUpdate',
      'callOnExchange',
    ].includes(method)
  ) {
    options[gasKeyName] = 6700000;
  } else {
    options[gasKeyName] = await gasBoost(
      contract.instance[method],
      parameters,
      options,
      environment,
    );
  }

  // Construct raw transaction object
  const rawTransaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

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

  // eslint-disable-next-line no-underscore-dangle
  await contract._pollTransactionReceipt(transactionHash);

  const rawReceipt = await environment.api.eth.getTransactionReceipt(
    transactionHash,
  );
  const decodedLogs = contract.parseEventLogs(rawReceipt.logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };
  return transactionReceipt;
};

export default sendTransaction;
