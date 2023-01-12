import capitalize from './capitalize';

describe('remove whitespace and capitalize only first letter', () => {

  test('several words', () => {
    const input = ' LouisWill Men Sunglasses';
    expect(capitalize(input)).toBe('Louiswill men sunglasses');
  });

  test('digits', () => {
    const input = '1METRO 70cc Motorcycle - MR70';
    expect(capitalize(input)).toBe('1metro 70cc motorcycle - mr70');
  });
});
