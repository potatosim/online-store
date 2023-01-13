const currencyFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
});

export default currencyFormatter;
