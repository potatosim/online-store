export const getFormattedCardNumber = (value: string) => {
  return value
    .replace(/\D/g, '')
    .split(/(\d{4})/)
    .filter((w: string) => w.length > 0)
    .join(' ')
    .substring(0, 19);
};
