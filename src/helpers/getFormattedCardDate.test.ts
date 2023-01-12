import { getFormattedCardDate } from './getFormattedCardDate';

describe('should take first 4 digits in a string and  format them as a date', () => {

  test('invalid date', () => {
    const input = '11/2023';
    expect(getFormattedCardDate(input)).toBe('11/20');
  });

  test('more then 4 digits', () => {
    const input = '123456789';
    expect(getFormattedCardDate(input)).toBe('12/34');
  });

  test('non digits symbols and whitespace', () => {
    const input = ' r3a 2n 2d 3om 789';
    expect(getFormattedCardDate(input)).toBe('32/23');
  });
});

//should leave only 3 first digit and remove all other digit, non digits symbol and whitespace
