import * as R from 'ramda';

import dataExtractor from './dataExtractor';

import {
  mockStaticData,
  mockAllData,
  mockMissingData,
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
  } else if (fundAddress === '0xbada55') {
    // mock everything
    const mockedData = await mockAllData(
      fundAddress,
      _timeSpanStart,
      _timeSpanEnd,
    );
    return mockedData;
  } else {
    // enhance dataExtractor data with mock where necessary
    // get data from dataExtractor first
    const data = await dataExtractor(fundAddress, _timeSpanStart, _timeSpanEnd);
    // enhance data
    // ...
    const enhancedData = await mockMissingData(data);
    return data;
  }
};

export default reportDataGenerator;
