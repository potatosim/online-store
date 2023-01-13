import { convertToQuery, parseQuery } from './queryHelpers';

describe('queryHelpers', () => {
  const TEXT_STRING_NUM = '1|2|6|10|20';
  const TEST_STRNUM_ARRAY = ['1', '2', '6', '10', '20'];
  const TEST_NUM_ARRAY = [1, 2, 6, 10, 20];
  describe('test parseQuery function', () => {
    const TEST_STRING = 'Hanna|Leon|mentOr|tEam';
    const TEST_ARRAY_TOLOWERCASE = ['hanna', 'leon', 'mentor', 'team'];

    it('should return correct array', () => {
      expect(parseQuery(TEST_STRING)).toEqual(TEST_ARRAY_TOLOWERCASE);
    });

    it('should return correct array', () => {
      expect(parseQuery<number>(TEXT_STRING_NUM)).toEqual(TEST_STRNUM_ARRAY);
    });
  });

  describe('test convertToQuery function', () => {
    const TEST_ARRAY = ['Hanna', 'Leon', 'mentOr', 'tEam'];

    const TEXT_STRING_TOLOWERCASE = 'hanna|leon|mentor|team';

    it('should return correct string', () => {
      expect(convertToQuery(TEST_ARRAY)).toBe(TEXT_STRING_TOLOWERCASE);
    });
    it('should return correct string of numbers', () => {
      expect(convertToQuery(TEST_NUM_ARRAY)).toBe(TEXT_STRING_NUM);
    });
  });
});
