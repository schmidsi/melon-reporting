import * as R from 'ramda';
import { createStore } from 'redux';
import { multiply } from '~/utils/functionalBigNumber';

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
  reportData: {},
  actionHistory: [],
  calculations: { sharePrice: 1 },
  calculationsHistory: [],
};

const randomInt = (from, to) => {
  return Math.floor(Math.random() * to) + from;
};

const getRandomInvestor = investors =>
  investors[randomInt(0, investors.length - 1)].address;

const computations = {
  load: (state, action) => ({
    ...initialState,
    reportData: action.reportData,
    actionHistory: [action],
  }),
  invest: (state, action) => {
    const {
      reportData,
      calculations,
      actionHistory,
      calculationsHistory,
    } = state;

    // Add to participations.list
    const updatedReportData = R.assocPath(
      ['participations', 'list'],
      [
        ...reportData.participations.list,
        {
          investor: getRandomInvestor(reportData.participations.investors),
          token: reportData.meta.quoteToken,
          type: 'invest',
          amount: action.amount,
          shares: multiply(calculations.sharePrice, action.amount),
          timestamp: action.timestamp || reportData.meta.inception,
        },
      ],
      reportData,
    );

    // Update holding
    // TODO

    return {
      reportData: updatedReportData,
      calculations,
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
 * initialData: FundReportData with prices, meta, investors
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

  store.dispatch({ type: 'LOAD', reportData: emptyFund });
  store.dispatch({ type: 'INVEST', amount: '100' });

  const finalState = store.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default eventSourcingMocker;
