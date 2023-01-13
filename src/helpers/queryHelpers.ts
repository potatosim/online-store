export const parseQuery = <T = string>(value: string): T[] => {
  return value.split('|').map((item) => item.toLowerCase()) as T[];
};

export const convertToQuery = (value: string[] | number[]) => {
  return value.map((item) => item.toString().toLowerCase()).join('|');
};
