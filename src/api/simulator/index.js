import * as R from 'ramda';
import { createStore, applyMiddleware, compose } from 'redux';

import { isFinite } from '~/utils/functionalBigNumber';
import doHistoricCalculations from './calculations/historic';
import addInvest from './modifications/addInvest';
import addRedeem from './modifications/addRedeem';
import addTrade from './modifications/addTrade';
import increaseHolding from './modifications/increaseHolding';
import decreaseHoldings from './modifications/decreaseHoldings';
import updateHoldings from './modifications/updateHoldings';

export const initialState = {
  data: {
    meta: {},
    trades: [],
    participations: {
      investors: [],
      list: [],
    },
    holdings: [],
    audits: [],
  },
  actionHistory: [],
  calculations: {
    timestamp: 0,
    sharePrice: 1,
    aum: 0,
    totalSupply: 0,
    allocation: [],
    investors: [],
  },
  calculationsHistory: [],
};

const secondsPerDay = 60 * 60 * 24;

const modifiers = {
  invest: (state, action) => {
    const { data, calculations } = state;

    const modifiyData = R.compose(
      addInvest(action),
      increaseHolding(action.value),
    );

    const result = modifiyData({ data, calculations });

    return R.merge(state, result);
  },
  redeem: (state, action) => {
    const { data, calculations } = state;

    const investor = calculations.investors.find(
      i => i.address === R.path(['investor', 'address'], action),
    );

    if (investor) {
      const modifiyData = R.compose(
        addRedeem(action.shares, action.timestamp, investor),
        decreaseHoldings(action.shares),
      );

      return R.merge(state, modifiyData({ data, calculations }));
    }

    return { data };
  },
  trade: (state, action) => {
    const { data, calculations } = state;

    const modifiyData = R.compose(
      addTrade(action),
      updateHoldings(action),
    );

    return R.merge(state, modifiyData({ data, calculations }));
  },
};

const calculateAfter = modifier => (state, action) => {
  const stateAfterAction = modifier(state, action);

  const {
    data,
    calculations,
    actionHistory,
    calculationsHistory,
  } = stateAfterAction;

  const lastCalculationTimestamp =
    calculations.timestamp || data.meta.inception;
  const lastCalculatedDayIndex =
    lastCalculationTimestamp === data.meta.inception
      ? -1
      : Math.floor(
        (lastCalculationTimestamp - data.meta.inception) / secondsPerDay,
      );

  const uncalculatedSeconds = action.timestamp - lastCalculationTimestamp;
  const uncalculatedDays = Math.floor(uncalculatedSeconds / secondsPerDay);

  if (uncalculatedDays === 0) {
    const lastRecalculation = doHistoricCalculations(lastCalculatedDayIndex)({
      data,
      calculations,
    }).calculations;
    lastRecalculation.timestamp = action.timestamp;
    const stillValidCalulactionsHistory = R.init(calculationsHistory);
    const result = {
      data,
      calculations: lastRecalculation,
      calculationsHistory: [
        ...stillValidCalulactionsHistory,
        lastRecalculation,
      ],
      actionHistory: [action, ...actionHistory],
    };
    return result;
  }

  const newCalculations = R.range(
    lastCalculatedDayIndex + 1,
    lastCalculatedDayIndex + uncalculatedDays + 1,
  ).map(
    dayIndex =>
      doHistoricCalculations(dayIndex)({ data, calculations }).calculations,
  );

  const lastCalculations = R.last(newCalculations);
  lastCalculations.timestamp = action.timestamp;

  const result = {
    data,
    calculations: lastCalculations,
    calculationsHistory: [...calculationsHistory, ...newCalculations],
    actionHistory: [action, ...actionHistory],
  };

  return result;
};

const isType = type => (_, action) => action.type === type;

const reducer = R.cond([
  [isType('INVEST'), calculateAfter(modifiers.invest)],
  [isType('REDEEM'), calculateAfter(modifiers.redeem)],
  [isType('TRADE'), calculateAfter(modifiers.trade)],
  [isType('CALCULATE'), calculateAfter(R.identity)],
  [R.T, state => state],
]);

const errorReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error(
      'Error in fund simulator',
      action.type,
      action,
      store.getState(),
      err,
    );
    throw err;
  }
};

const guards = () => next => action => {
  if (
    (action.type === 'TRADE' && !isFinite(action.sellHowMuch)) ||
    !isFinite(action.buyHowMuch)
  ) {
    console.warn('Invalid trade found', action);
    return next({ type: 'NOTHING', timestamp: action.timestamp });
  }
  return next(action);
};

const fundSimulator = (initialData = initialState.data) =>
  createStore(
    reducer,
    R.assocPath(['data'], initialData, initialState),
    compose(
      applyMiddleware(errorReporter, guards),
      /* eslint-disable no-underscore-dangle */
      global.__REDUX_DEVTOOLS_EXTENSION__
        ? global.__REDUX_DEVTOOLS_EXTENSION__()
        : R.identity,
      /* eslint-enable */
    ),
  );

export default fundSimulator;
