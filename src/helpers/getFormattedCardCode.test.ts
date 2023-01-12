import { getFormattedCardCode } from './getFormattedCardCode';

describe('should leave only 3 first digit and remove all other digit, non digits symbol and whitespace', () => {

  test('whitespace and non digits symbols', () => {
    const value = '3qWe  2rTy 2asF';
    expect(getFormattedCardCode(value)).toBe('322');
  });

  test('more then 3 digits', () => {
    const input = ' qwe7?7=7&ewq 123123';
    expect(getFormattedCardCode(input)).toBe('777');
  });
});
