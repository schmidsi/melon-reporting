import * as R from 'ramda';
import { createStore, applyMiddleware, compose } from 'redux';

import {
  toNumber,
  floor,
  subtract,
  divide,
  isFinite,
} from '~/utils/functionalBigNumber';
import doHistoricCalculations from '~/api/calculations/doHistoricCalculations';
import addInvest from '~/api/modifications/addInvest';
import addRedeem from '~/api/modifications/addRedeem';
import addTrade from '~/api/modifications/addTrade';
import increaseHolding from '~/api/modifications/increaseHolding';
import decreaseHoldings from '~/api/modifications/decreaseHoldings';
import updateHoldings from '~/api/modifications/updateHoldings';

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

const secondsPerDay = 60 * 60 * 24;

const getDayIndex = (data, timestamp) =>
  toNumber(
    floor(divide(subtract(timestamp, data.meta.timeSpanStart), secondsPerDay)),
  );

const computations = {
  invest: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const updateData = R.compose(
      // calculations
      doHistoricCalculations(getDayIndex(data, action.timestamp)),

      // modifications
      addInvest(action),
      increaseHolding(action.value),
    );

    return {
      ...updateData({ data, calculations }),
      calculationsHistory: [...calculationsHistory, calculations],
      actionHistory: [...actionHistory, action],
    };
  },
  redeem: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const investor = calculations.investors.find(
      i => i.address === R.path(['investor', 'address'], action),
    );

    if (investor) {
      const updateData = R.compose(
        // calculations
        doHistoricCalculations(getDayIndex(data, action.timestamp)),

        // modifications
        addRedeem(action.shares, action.timestamp, investor),
        decreaseHoldings(action.shares),
      );

      return {
        ...updateData({ data, calculations }),
        calculationsHistory: [...calculationsHistory, calculations],
        actionHistory: [...actionHistory, action],
      };
    }

    return {
      ...doHistoricCalculations(getDayIndex(data, action.timestamp))({
        data,
        calculations,
      }),
      calculationsHistory: [...calculationsHistory, calculations],
      actionHistory: [...actionHistory, action],
    };
  },
  trade: (state, action) => {
    const { data, calculations, actionHistory, calculationsHistory } = state;

    const updateData = R.compose(
      // calculations
      doHistoricCalculations(getDayIndex(data, action.timestamp)),

      // modifications
      addTrade(action),
      updateHoldings(action),
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
    ...doHistoricCalculations(getDayIndex(data, action.timestamp))({
      data,
      calculations,
    }),
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

const guards = store => next => action => {
  if (
    (action.type === 'TRADE' && !isFinite(action.sellHowMuch)) ||
    !isFinite(action.buyHowMuch)
  ) {
    console.warn('Invalid trade found', action);
    return next({ type: 'NOTHING', timestamp: action.timestamp });
  }
  return next(action);
};

const fundSimulator = initialData =>
  createStore(
    reducer,
    R.assocPath(['data'], initialData, initialState),
    compose(
      applyMiddleware(errorReporter, guards),
      /* eslint-disable no-underscore-dangle */
      global.__REDUX_DEVTOOLS_EXTENSION__ &&
        global.__REDUX_DEVTOOLS_EXTENSION__(),
      /* eslint-enable */
    ),
  );

export default fundSimulator;
