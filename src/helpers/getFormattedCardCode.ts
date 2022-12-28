export const getFormattedCardCode = (value: string) => {
  return value.replace(/\D/g, '').replace(' ', '').substring(0, 3);
};
