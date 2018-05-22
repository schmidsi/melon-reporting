import Wallet from 'ethers-wallet';
import bip39 from 'bip39';

const createWallet = () => {
  const mnemonic = bip39.generateMnemonic();
  return new Wallet.Wallet.fromMnemonic(mnemonic); // eslint-disable-line new-cap
};

export default createWallet;
