import checkWords from './checkWords';

describe('checkWords function', () => {
  describe('test name field', () => {
    const MIN_WORDS = 2;
    const MIN_WORD_LENGTH = 3;
    const CORRECT_NAME = 'hanna hanna';
    const INCORRECT_NAME = 'han ';
    it('should return true if correct name passed', () => {
      expect(checkWords(CORRECT_NAME, MIN_WORDS, MIN_WORD_LENGTH)).toBe(true);
    });

    it('should return false if incorrect name passed', () => {
      expect(checkWords(INCORRECT_NAME, MIN_WORDS, MIN_WORD_LENGTH)).toBe(false);
    });
  });

  describe('test address field', () => {
    const MIN_WORDS = 3;
    const MIN_WORD_LENGTH = 5;
    const CORRECT_ADDRESS = 'Hrutskogo place street';
    const INCORRECT_ADDRESS = 'street 20';
    it('should return true if correct address passed', () => {
      expect(checkWords(CORRECT_ADDRESS, MIN_WORDS, MIN_WORD_LENGTH)).toBe(true);
    });

    it('should return false if incorrect address passed', () => {
      expect(checkWords(INCORRECT_ADDRESS, MIN_WORDS, MIN_WORD_LENGTH)).toBe(false);
    });
  });
});
