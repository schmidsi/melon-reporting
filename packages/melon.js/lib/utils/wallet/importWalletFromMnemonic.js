import Wallet from 'ethers-wallet';

const importWallet = mnemonic => Wallet.Wallet.fromMnemonic(mnemonic);

export default importWallet;
