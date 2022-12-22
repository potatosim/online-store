import { ICartItem } from 'types/CartItem';

const getPageItems = (items: ICartItem[], limit: number, page: number) => {
  const startIndex = limit * (page - 1);
  const endIndex = startIndex + limit;
  return items.slice(startIndex, endIndex);
};

export default getPageItems;
