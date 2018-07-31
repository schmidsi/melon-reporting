import dataExtractor from './dataExtractor';

import doFinalCalculations from '~/api/calculations/doFinalCalculations';
import eventSourcingMocker from './mocking/eventSourcingMocker';

import {
  mockStaticData,
  mockRandomEmptyFund,
} from './mocking/mockDataGenerator';

const reportDataGenerator = async (
  fundAddress,
  _timeSpanStart,
  _timeSpanEnd,
) => {
  if (fundAddress === '0xdeadbeef') {
    // all static data
    const staticData = await mockStaticData();
    return staticData;
  }
  if (fundAddress === '0xbada55') {
    // mock everything
    const emptyFund = await mockRandomEmptyFund();
    const mockData = eventSourcingMocker(emptyFund);

    const withFinalCalculations = doFinalCalculations(mockData);

    return withFinalCalculations;
  }
  // enhance dataExtractor data with mock where necessary
  // get data from dataExtractor first
  const data = await dataExtractor(fundAddress, _timeSpanStart, _timeSpanEnd);

  return data;
};

export default reportDataGenerator;
