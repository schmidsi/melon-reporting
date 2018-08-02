import rezipGrayscale from './rezipGrayscale';

test('Even', () => {
  const even = rezipGrayscale([1, 2, 3, 4]);
  expect(even.length).toBe(4);
});

test('Odd', () => {
  const odd = rezipGrayscale([1, 2, 3]);
  expect(odd.length).toBe(3);
});
