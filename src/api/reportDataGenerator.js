import * as R from 'ramda';

import dataExtractor from './dataExtractor';

import {
  mockStaticData,
  mockAllData,
  mockMissingData,
} from './mockDataGenerator';

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
  } else {
    // enhance dataExtractor data with mock where necessary
    // get data from dataExtractor first
    const data = await dataExtractor(fundAddress, _timeSpanStart, _timeSpanEnd);
    // enhance data
    // ...
    return data;
  }
};

export default reportDataGenerator;
