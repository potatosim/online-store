import { ProductItem } from 'types/ProductItem';

export const getFieldCount = (items: ProductItem[], field: 'category' | 'brand') => {
  return items.reduce<Record<string, number>>((acc, cur) => {
    if (acc[cur[field].toLocaleLowerCase()]) {
      acc[cur[field].toLocaleLowerCase()] += 1;
    } else {
      acc[cur[field].toLocaleLowerCase()] = 1;
    }
    return acc;
  }, {});
};
