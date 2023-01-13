export const getFormattedCardDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .split(/(\d{2})/)
    .filter((w: string) => w.length > 0)
    .join('/')
    .substring(0, 5);
};
