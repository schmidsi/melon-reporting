import * as R from 'ramda';

// MLN-T-M => MLN
const getStemmedSymbol: (symbol: string) => string = R.compose(
  R.cond([[R.equals('ETH'), R.always('WETH')], [R.T, R.identity]]),
  R.nth(0) as (arg: string[]) => string,
  R.split('-'),
);

export default getStemmedSymbol;
