/* eslint-env jest */
import fundSimulator from '.';

describe('Walkthrough', () => {
  const fund = fundSimulator();

  test('Setup', () => {
    console.log(fund.getState());
  });
});
