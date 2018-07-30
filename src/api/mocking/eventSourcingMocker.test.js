import actionGenerator from './eventSourcingMocker';
import { mockRandomEmptyFund } from './mockDataGenerator';

test('Smoke test', async () => {
  const fund = await mockRandomEmptyFund();
  // const result = await actionGenerator();

  console.log(JSON.stringify(fund, null, 4));
  expect(3).toBe(3);
});
