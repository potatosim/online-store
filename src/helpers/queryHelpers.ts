export const parseQuery = <T = string>(value: string): T[] => {
  return value.split('|') as T[];
};

export const convertToQuery = (value: string[] | number[]) => {
  return value.join('|');
};
