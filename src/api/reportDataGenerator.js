import dataExtractor from './dataExtractor';

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

    return eventSourcingMocker(emptyFund);
  }
  // enhance dataExtractor data with mock where necessary
  // get data from dataExtractor first
  const data = await dataExtractor(fundAddress, _timeSpanStart, _timeSpanEnd);

  return data;
};

export default reportDataGenerator;
