import * as R from 'ramda';
import { createStore } from 'redux';
import { shuffle } from 'd3-array';

import {
  multiply,
  add,
  subtract,
  divide,
  greaterThan,
} from '~/utils/functionalBigNumber';
import { randomBigNumber } from './utils';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const secondsPerDay = 60 * 60 * 24;

const defaultActionWeights = {
  // TODO: Ideas for enhancing
  // openPosition: 0.1,
  // closePosition: 0.1,
  // increasePosition: 0.1,
  // decreasePosition: 0.1,
  invest: 2,
  redeem: 1,
  trade: 20,
  nothing: 3,
};

const selectRandomWeightedAction = actions => {
  const list = R.toPairs(actions);

  const accumulator = (carry, [action, weight]) => [
    carry + weight,
    [action, carry + weight],
  ];

  const [total, prepared] = R.mapAccum(accumulator, 0, list);

  const selector = Math.random() * total;
  const [finalAction] = prepared.find(([action, weight]) => weight >= selector);

  return finalAction;
};

const initialState = {
  data: {},
  actionHistory: [],
  calculations: {
    sharePrice: 1,
    aum: 0,
    totalSupply: 0,
    allocation: [],
    investors: [],
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

const addInvest = (amount, timestamp) =>
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

const addRedeem = (amount, timestamp, investor) =>
  setPath(['data', 'participations', 'list'], ({ data, calculations }) => [
    ...data.participations.list,
    {
      investor,
      token: data.meta.quoteToken,
      type: 'redeem',
      amount: multiply(calculations.sharePrice, amount),
      shares: amount,
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

const decreaseHolding = (amount, token) =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: isSameToken(holding.token, token || data.meta.quoteToken)
        ? subtract(holding.quantity, amount)
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
    divide(calculations.aum, calculations.totalSupply),
  );

const calculateAllocation = dayIndex =>
  setPath(['calculations', 'allocation'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      token: holding.token,
      price: holding.priceHistory[dayIndex],
      quantity: holding.quantity,
      percentage: divide(calculations.aum, holding.quantity),
    })),
  );

const updateInvestor = (investor, participation, aum) => {
  if (investor.address !== participation.investor) return investor;

  const shares = investor.shares || '0';
  const updatedShares =
    participation.type === 'invest'
      ? add(shares, participation.shares)
      : subtract(investor.shares, participation.shares);
  const percentage = divide(updatedShares, aum);

  return {
    ...investor,
    shares: updatedShares,
    percentage,
  };
};

const calculateInvestors = () =>
  setPath(['calculations', 'investors'], ({ data, calculations }) =>
    data.participations.list.reduce(
      (carry, participation) =>
        carry.find(investor => investor.address === participation.investor)
          ? carry.map(investor =>
              updateInvestor(investor, participation, calculations.aum),
            )
          : [
              ...carry,
              { address: participation.address, shares: participation.shares },
            ],
      data.participations.investors,
    ),
  );

const getTimestamp = (data, dayIndex) =>
  add(data.meta.timeSpanStart, multiply(dayIndex, secondsPerDay));

const doCalculations = dayIndex =>
  R.compose(
    calculateInvestors(),
    calculateAllocation(dayIndex),
    calculateSharePrice(),
    calculateTotalSupply(),
    calculateAum(dayIndex),
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
      // calculations
      doCalculations(action.dayIndex),

      // modifications
      addInvest(action.amount, action.timestamp),
      increaseHolding(action.amount),
    );

    return {
      ...updateData({ data, calculations }),
      calculationsHistory: [...calculationsHistory, calculations],
      actionHistory: [...actionHistory, action],
    };
  },
  redeem: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const investor = action.investor
      ? calculations.investors.find(
          investor => investor.address === action.investor,
        )
      : shuffle(
          calculations.investors.filter(investor =>
            greaterThan(investor.shares, 0),
          ),
        )[0];

    const amount = action.amount || randomBigNumber(0, investor.shares);

    const updateData = R.compose(
      // calculations
      doCalculations(action.dayIndex),

      // modifications
      addRedeem(amount, getTimestamp(data, action.dayIndex), investor.address),
      decreaseHolding(amount),
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
  [isType('REDEEM'), computations.redeem],
  [R.T, state => state],
]);

/**
 * First create fund from inception to now with all history
 * If other timespan -> filter/process this fund
 */

const eventSourcingMocker = initialData => {
  const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  // store.subscribe((...args) => console.log('UPDATE', ...args));

  store.dispatch({ type: 'LOAD', data: initialData });
  store.dispatch({ type: 'INVEST', amount: '100', dayIndex: 0 });

  const reportDays = Math.round(
    (initialData.meta.timeSpanEnd - initialData.meta.timeSpanStart) /
      secondsPerDay,
  );

  R.range(0, reportDays).map(dayIndex => {
    R.cond([
      [
        R.equals('invest'),
        () =>
          store.dispatch({
            type: 'INVEST',
            amount: randomBigNumber(1, 100),
            dayIndex,
          }),
      ],
      [
        R.equals('redeem'),
        () =>
          store.dispatch({
            type: 'REDEEM',
            dayIndex,
          }),
      ],
      [
        R.equals('trade'),
        () =>
          store.dispatch({
            type: 'TRADE',
            amount: randomBigNumber(1, 100),
            dayIndex,
          }),
      ],
      [
        R.equals('nothing'),
        () =>
          store.dispatch({
            type: 'NOTHING',
            amount: randomBigNumber(1, 100),
            dayIndex,
          }),
      ],
    ])(selectRandomWeightedAction(defaultActionWeights));
  });

  console.log(
    initialData.meta.timeSpanEnd,
    initialData.meta.timeSpanStart,
    reportDays,
  );

  const finalState = store.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default eventSourcingMocker;
