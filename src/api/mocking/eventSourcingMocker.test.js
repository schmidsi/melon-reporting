import actionGenerator from './eventSourcingMocker';

test('Smoke test', async () => {
  const result = await actionGenerator();

  console.log(actionGenerator());
  expect(sum(1, 2)).toBe(3);
});
