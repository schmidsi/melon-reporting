import * as R from 'ramda';
import { createStore, applyMiddleware, compose } from 'redux';
import { shuffle } from 'd3-array';

import {
  multiply,
  add,
  divide,
  greaterThan,
} from '~/utils/functionalBigNumber';
import { randomBigNumber, randomHexaDecimal } from './utils';

import doHistoricCalculations from '~/api/calculations/doHistoricCalculations';
import addInvest from '~/api/modifications/addInvest';
import addRedeem from '~/api/modifications/addRedeem';
import addTrade from '~/api/modifications/addTrade';
import increaseHolding from '~/api/modifications/increaseHolding';
import decreaseHoldings from '~/api/modifications/decreaseHoldings';
import updateHoldings from '~/api/modifications/updateHoldings';
import isSameToken from '~/api/queries/isSameToken';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const secondsPerDay = 60 * 60 * 24;

const defaultActionWeights = {
  invest: 2,
  redeem: 1,
  trade: 10,
  nothing: 60,
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

const randomInt = (from, to) => Math.floor(Math.random() * to) + from;

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

const getTimestamp = (data, dayIndex) =>
  add(data.meta.timeSpanStart, multiply(dayIndex, secondsPerDay));

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
      doHistoricCalculations(action.dayIndex),

      // modifications
      addInvest({
        amount: action.amount,
        timestamp: action.timestamp,
        investor: getRandomInvestor(data.participations.investors),
      }),
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
      ? calculations.investors.find(i => i.address === action.investor)
      : shuffle(
        calculations.investors.filter(i => greaterThan(i.shares, 0)),
      )[0];

    if (investor) {
      const shares = action.shares || randomBigNumber(0, investor.shares);

      const updateData = R.compose(
        // calculations
        doHistoricCalculations(action.dayIndex),

        // modifications
        addRedeem(
          shares,
          getTimestamp(data, action.dayIndex),
          investor.address,
        ),
        decreaseHoldings(shares),
      );

      return {
        ...updateData({ data, calculations }),
        calculationsHistory: [...calculationsHistory, calculations],
        actionHistory: [...actionHistory, action],
      };
    }

    return {
      ...doHistoricCalculations(action.dayIndex)({ data, calculations }),
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
      doHistoricCalculations(action.dayIndex),

      // modifications
      addTrade({
        buyToken,
        buyHowMuch,
        sellToken,
        sellHowMuch,
        timestamp: getTimestamp(data, action.dayIndex),
        exchange: shuffle(data.meta.exchanges)[0],
        transaction: randomHexaDecimal(64),
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
  nothing: (
    { data, calculations, actionHistory, calculationsHistory },
    action,
  ) => ({
    ...doHistoricCalculations(action.dayIndex)({ data, calculations }),
    calculationsHistory: [...calculationsHistory, calculations],
    actionHistory: [...actionHistory, action],
  }),
};

const isType = type => (_, action) => action.type === type;

const reducer = R.cond([
  [isType('LOAD'), computations.load],
  [isType('INVEST'), computations.invest],
  [isType('REDEEM'), computations.redeem],
  [isType('TRADE'), computations.trade],
  [isType('NOTHING'), computations.nothing],
  [R.T, state => state],
]);

const testMiddleware = store => next => action =>
  // console.log(store, next, action);
  next(action);

const eventSourcingMocker = initialData => {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(testMiddleware),
      /* eslint-disable no-underscore-dangle */
      global.__REDUX_DEVTOOLS_EXTENSION__ &&
      global.__REDUX_DEVTOOLS_EXTENSION__(),
      /* eslint-enable */
    ),
  );

  store.dispatch({ type: 'LOAD', data: initialData });
  store.dispatch({ type: 'INVEST', amount: '100', dayIndex: 0 });

  const reportDays = Math.round(
    (initialData.meta.timeSpanEnd - initialData.meta.timeSpanStart) /
    secondsPerDay,
  );

  R.range(0, reportDays).map(dayIndex => {
    const dispatchAction = R.cond([
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
    ]);
    dispatchAction(selectRandomWeightedAction(defaultActionWeights));
  });

  const finalState = store.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default eventSourcingMocker;
