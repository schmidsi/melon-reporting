const encryptWallet = async (unencryptedWallet, password) => {
  const encryptedWallet = await unencryptedWallet.encrypt(password);
  return encryptedWallet;
};

export default encryptWallet;
