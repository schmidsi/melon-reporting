import * as R from 'ramda';

import dataExtractor from './dataExtractor';

import eventSourcingMocker from './mocking/eventSourcingMocker';

import {
  mockStaticData,
  mockAllData,
  mockMissingData,
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
  } else if (fundAddress === '0xbada55') {
    // mock everything
    const emptyFund = await mockRandomEmptyFund();
    // fundAddress,
    // _timeSpanStart,
    // _timeSpanEnd,

    return eventSourcingMocker(emptyFund);
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
