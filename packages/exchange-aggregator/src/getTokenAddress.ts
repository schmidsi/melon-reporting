import * as tokenInfo from '@melonproject/smart-contracts/utils/info/tokenInfo';
import * as R from 'ramda';

const getTokenAddress = (symbol: string) =>
  R.path(['live', symbol, 'address'], tokenInfo);

export default getTokenAddress;
