export const getFormattedCardCode = (value: string) => {
  return value.replace(/\D/g, '').substring(0, 3);
};
