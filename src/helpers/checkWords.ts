const checkWords = (value: string, words: number, wordsLength: number) =>
  value
    .trim()
    .split(' ')
    .every((item) => item.length >= wordsLength) && value.trim().split(' ').length >= words;

export default checkWords;
