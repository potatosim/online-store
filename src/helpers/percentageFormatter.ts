const percentageFormatter = Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  minimumIntegerDigits: 2,
});

export default percentageFormatter;
