const capitalize = (value: string): string => {
  const str = value.trim();
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export default capitalize;
