const getAccountAddress = environment =>
  environment.account ? environment.account.address : null;

export default getAccountAddress;
