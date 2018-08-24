/* eslint-env jest */
import R from 'ramda';

import { fundSimulator, initialState } from '.';

const secondsPerDay = 60 * 60 * 24;

describe('Walkthrough', () => {
  const inception = 1514764800;
  const quoteToken = {
    symbol: 'ETH',
    address: '0x1',
  };
  const manager = {
    address: '0x3',
    name: 'manager',
  };

  const testInitialState = R.compose(
    R.assocPath(
      ['data', 'holdings'],
      [
        {
          priceHistory: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
          quantity: '0',
          token: { symbol: 'ETH', address: '0x1' },
        },
        {
          priceHistory: [
            '0.01',
            '0.02',
            '0.03',
            '0.04',
            '0.05',
            '0.06',
            '0.07',
            '0.08',
            '0.09',
            '0.10',
          ],
          quantity: '0',
          token: { symbol: 'MLN', address: '0x2' },
        },
      ],
    ),
    R.assocPath(['data', 'meta', 'inception'], inception),
    R.assocPath(['data', 'meta', 'quoteToken'], quoteToken),
    // R.assocPath(['data', 'participations', 'investors'], [manager]),
  )(initialState);
  const fund = fundSimulator(testInitialState.data);

  test('Setup', () => {
    const state = fund.getState();
    expect(state.calculations.sharePrice).toBe(1);
    expect(state.data.holdings[0].quantity).toBe('0');
  });

  test('Empty calculate', () => {
    fund.dispatch({ type: 'CALCULATE', timestamp: inception });
    const state = fund.getState();
    expect(state.calculations.sharePrice).toBe('1');
  });

  test('Two calculations on the same date do not create a new calculationHistory entry', () => {
    fund.dispatch({ type: 'CALCULATE', timestamp: inception + 4000 });
    const state = fund.getState();
    expect(state.calculations.timestamp).toBe(inception + 4000);
    expect(state.calculationsHistory.length).toBe(1);
    expect(state.actionHistory.length).toBe(2);
  });

  test('A calculation on the next day should create a new calculationHistory entry', () => {
    fund.dispatch({ type: 'CALCULATE', timestamp: inception + secondsPerDay });
    const state = fund.getState();
    expect(state.calculations.timestamp).toBe(inception + secondsPerDay);
    expect(state.calculationsHistory.length).toBe(2);
    expect(state.actionHistory.length).toBe(3);
    expect(state.calculations.allocation[0].percentage).toBe('0');
  });

  test('First investment', () => {
    fund.dispatch({
      type: 'INVEST',
      value: '10',
      investor: manager,
      timestamp: inception + 2.3 * secondsPerDay,
    });

    const state = fund.getState();
    console.log(JSON.stringify(state, null, 4));
    expect(state.calculationsHistory.length).toBe(3);
    expect(state.data.participations.investors.length).toBe(1);
    expect(state.data.participations.list.length).toBe(1);
  });
});
