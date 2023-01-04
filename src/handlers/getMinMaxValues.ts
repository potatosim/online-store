import { ProductItem } from 'types/ProductItem';

export const getMinMaxValues = (items: ProductItem[], field: 'price' | 'stock') => {
  const min = Math.min(...items.map((item) => item[field]));
  const max = Math.max(...items.map((item) => item[field]));
  return {
    min,
    max,
  };
};
