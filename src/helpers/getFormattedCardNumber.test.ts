import { getFormattedCardNumber } from './getFormattedCardNumber';

describe('should take first 16 digits in a string and  format them as a card', () => {

  test('more then 16 digits', () => {
    const input = '12345678901234567890123';
    expect(getFormattedCardNumber(input)).toBe('1234 5678 9012 3456');
  });

  test('non digits symbols and whitespace', () => {
    const input = ' One11 11Two 22Three Four22 _33 33=?||4444&& 5 5 5 5';
    expect(getFormattedCardNumber(input)).toBe('1111 2222 3333 4444');
  });
});
