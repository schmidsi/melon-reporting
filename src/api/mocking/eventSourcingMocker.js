import * as R from 'ramda';
import { createStore } from 'redux';
import { multiply, add, subtract, divide } from '~/utils/functionalBigNumber';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const defaultProbabilities = {
  // openPosition: 0.1,
  // closePosition: 0.1,
  // increasePosition: 0.1,
  // decreasePosition: 0.1,
  invest: 0.1,
  redeem: 0.1,
  buy: 0.1,
  sell: 0.1,
};

const initialState = {
  data: {},
  actionHistory: [],
  calculations: {
    sharePrice: 1,
    aum: 0,
    totalSupply: 0,
    holdings: [],
    participation: [],
  },
  calculationsHistory: [],
};

const isSameToken = (a, b) => a.symbol === b.symbol && a.address === b.address;

const randomInt = (from, to) => {
  return Math.floor(Math.random() * to) + from;
};

const getRandomInvestor = investors =>
  investors[randomInt(0, investors.length - 1)].address;

const setPath = (path, setter) => ({ data, calculations }) =>
  R.assocPath(path, setter({ data, calculations }), { data, calculations });

const addSubscription = (amount, timestamp) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor: getRandomInvestor(data.participations.investors),
      token: data.meta.quoteToken,
      type: 'invest',
      amount,
      shares: multiply(calculations.sharePrice, amount),
      timestamp: timestamp || data.meta.inception,
    },
  ]);

const increaseHolding = (amount, token) =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: isSameToken(holding.token, token || data.meta.quoteToken)
        ? add(holding.quantity, amount)
        : holding.quantity,
    })),
  );

const calculateAum = dayIndex =>
  setPath(['calculations', 'aum'], ({ data, calculations }) =>
    data.holdings.reduce(
      (carry, holding) =>
        add(carry, multiply(holding.quantity, holding.priceHistory[dayIndex])),
      '0',
    ),
  );

const calculateTotalSupply = () =>
  setPath(['calculations', 'totalSupply'], ({ data, calculations }) =>
    data.participations.list.reduce(
      (carry, participation) =>
        participation.type === 'invest'
          ? add(carry, participation.shares)
          : subtract(carry, participation.shares),
      '0',
    ),
  );

const calculateSharePrice = () =>
  setPath(['calculations', 'sharePrice'], ({ data, calculations }) =>
    divide(calculations.aum / calculations.totalSupply),
  );

const computations = {
  load: (state, action) => ({
    ...initialState,
    data: action.data,
    actionHistory: [action],
  }),
  invest: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const updateData = R.compose(
      calculateSharePrice(),
      calculateTotalSupply(),
      calculateAum(action.dayIndex),
      addSubscription(action.amount, action.timestamp),
      increaseHolding(action.amount),
    );

    return {
      ...updateData({ data, calculations }),
      calculationsHistory: [...calculationsHistory, calculations],
      actionHistory: [...actionHistory, action],
    };
  },
};

const isType = type => (_, action) => action.type === type;

const reducer = R.cond([
  [isType('LOAD'), computations.load],
  [isType('INVEST'), computations.invest],
  [R.T, state => state],
]);

/**
 * First create fund from inception to now with all history
 * If other timespan -> filter/process this fund
 */

/**
 *
 * initialData: Funddata with prices, meta, investors
 */
const actionGenerator = ({ initialData, probabilities }) => {
  const p = { ...defaultProbabilities, ...probabilities };

  /**
   * Loop through the days
   * For every day: take an action
   * Apply the action
   * Update daily history
   */

  return { data, calculationsHistory, actionHistory };
};

// calculationsHistory: For every day: holdings with proportion, investors with percentage and holdings, aum, sharePrice, totalSupply,
// ActionHistory: All actions

const eventSourcingMocker = emptyFund => {
  const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  // store.subscribe((...args) => console.log('UPDATE', ...args));

  store.dispatch({ type: 'LOAD', data: emptyFund });
  store.dispatch({ type: 'INVEST', amount: '100', dayIndex: 0 });

  const finalState = store.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default eventSourcingMocker;
