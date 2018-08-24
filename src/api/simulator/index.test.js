/* eslint-env jest */
import R from 'ramda';

import { fundSimulator, initialState } from '.';

describe('Walkthrough', () => {
  const inception = 1514764800;

  const testInitialState = R.compose(
    R.assocPath(
      ['data', 'holdings'],
      [
        {
          priceHistory: ['1', '1'],
          quantity: '0',
          token: { symbol: 'ETH', address: '0x1' },
        },
        {
          priceHistory: ['0.02', '0.03'],
          quantity: '0',
          token: { symbol: 'MLN', address: '0x2' },
        },
      ],
    ),
    R.assocPath(['data', 'meta', 'inception'], inception),
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
    fund.dispatch({ type: 'CALCULATE', timestamp: inception + 60 * 60 * 24 });
    const state = fund.getState();
    expect(state.calculations.timestamp).toBe(inception + 60 * 60 * 24);
    expect(state.calculationsHistory.length).toBe(2);
    expect(state.actionHistory.length).toBe(3);
    expect(state.calculations.allocation[0].percentage).toBe('0');
  });
});
