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

const state = {};

/**
 *
 * initialData: FundReportData with prices, meta, investors
 */
const actionGenerator = async ({ initialData, probabilities }) => {
  const p = { ...defaultProbabilities, ...probabilities };

  /**
   * Loop through the days
   * For every day: take an action
   * Apply the action
   * Update daily history
   */

  return { data, dailyHistory, actionHistory };
};

// DailyHistory: For every day: holdings with proportion, investors with percentage and holdings, aum, sharePrice, totalSupply,
// ActionHistory: All actions

export default actionGenerator;
