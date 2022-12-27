import { CartItem } from 'types/CartItem';

const getPageItems = (items: CartItem[], limit: number, page: number) => {
  const startIndex = limit * (page - 1);
  const endIndex = startIndex + limit;
  return items.slice(startIndex, endIndex);
};

export default getPageItems;
