import dataExtractor from './dataExtractor';

import doFinalCalculations from '~/api/calculations/doFinalCalculations';
import fundMocker from './mocking/fundMocker';

import {
  mockStaticData,
  mockRandomEmptyFund,
} from './mocking/mockDataGenerator';
import validateReport from '~/api/validateReport';

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
    const mockData = fundMocker(emptyFund);

    const mockWithFinalCalculations = doFinalCalculations(mockData);
    const mockWithValidation = validateReport(mockWithFinalCalculations);

    return mockWithValidation;
  }
  // enhance dataExtractor data with mock where necessary
  // get data from dataExtractor first
  const data = await dataExtractor(fundAddress, _timeSpanStart, _timeSpanEnd);
  const withFinalCalculations = doFinalCalculations(data);
  const withValidation = validateReport(withFinalCalculations);

  return withValidation;
};

export default reportDataGenerator;
