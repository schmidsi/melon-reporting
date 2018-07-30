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
import { randomBigNumber, randomHexaDecimal } from './utils';

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

const getHolding = (calculations, token) =>
  calculations.allocation.find(holding => isSameToken(holding.token, token))
    .quantity;

const getPrice = (calculations, token) =>
  calculations.allocation.find(holding => isSameToken(holding.token, token))
    .price;

const getOrthogonalPrice = (calculations, buyToken, sellToken) => {
  const buyTokenPrice = getPrice(calculations, buyToken);
  const sellTokenPrice = getPrice(calculations, sellToken);
  return divide(sellTokenPrice, buyTokenPrice);
};

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
    data.holdings.map(holding => {
      const price = holding.priceHistory[dayIndex];
      const value = multiply(holding.quantity, price);

      return {
        token: holding.token,
        price,
        quantity: holding.quantity,
        value,
        percentage: divide(value, calculations.aum),
      };
    }),
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

const addTrade = ({
  buyToken,
  buyHowMuch,
  sellToken,
  sellHowMuch,
  exchange,
  timestamp,
  transaction = randomHexaDecimal(64),
}) =>
  setPath(['data', 'trades'], ({ data, calculations }) => [
    ...data.trades,
    {
      buy: {
        token: buyToken,
        howMuch: buyHowMuch,
      },
      sell: {
        token: sellToken,
        howMuch: sellHowMuch,
      },
      exchange: exchange || shuffle(data.meta.exchanges)[0],
      timestamp,
      transaction,
    },
  ]);

const updateHoldings = ({ buyToken, buyHowMuch, sellToken, sellHowMuch }) =>
  setPath(['data', 'holdings'], ({ data, calculations }) =>
    data.holdings.map(holding => ({
      ...holding,
      quantity: R.cond([
        [
          ({ buyToken }) => isSameToken(buyToken, holding.token),
          ({ buyHowMuch }) => add(holding.quantity, buyHowMuch),
        ],
        [
          ({ sellToken }) => isSameToken(sellToken, holding.token),
          ({ sellHowMuch }) => subtract(holding.quantity, sellHowMuch),
        ],
        [R.T, () => holding.quantity],
      ])({ buyToken, buyHowMuch, sellToken, sellHowMuch }),
    })),
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
  trade: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const sellToken =
      action.token || Math.random() >= 0.5
        ? data.meta.quoteToken
        : shuffle(
            data.holdings.filter(holding => greaterThan(holding.quantity, 0)),
          )[0].token;

    const buyToken = isSameToken(sellToken, data.meta.quoteToken)
      ? shuffle(
          data.holdings.filter(
            holding => !isSameToken(sellToken, holding.token),
          ),
        )[0].token
      : data.meta.quoteToken;

    const type = isSameToken(sellToken, data.meta.quoteToken) ? 'buy' : 'sell';

    const orthogonalPrice = getOrthogonalPrice(
      calculations,
      buyToken,
      sellToken,
    );

    // Only sell up to 50% of quote token
    const sellHowMuch =
      action.sellHowMuch || type === 'buy'
        ? randomBigNumber(0, divide(getHolding(calculations, sellToken), 2))
        : randomBigNumber(0, getHolding(calculations, sellToken));

    const buyHowMuch = multiply(sellHowMuch, orthogonalPrice);

    const updateData = R.compose(
      // calculations
      doCalculations(action.dayIndex),

      // modifications
      addTrade({
        buyToken,
        buyHowMuch,
        sellToken,
        sellHowMuch,
        timestamp: getTimestamp(data, action.dayIndex),
      }),
      updateHoldings({
        buyToken,
        buyHowMuch,
        sellToken,
        sellHowMuch,
      }),
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
  [isType('TRADE'), computations.trade],
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
            dayIndex,
          }),
      ],
      [
        R.equals('nothing'),
        () =>
          store.dispatch({
            type: 'NOTHING',
            dayIndex,
          }),
      ],
    ])(selectRandomWeightedAction(defaultActionWeights));
  });

  const finalState = store.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default eventSourcingMocker;
