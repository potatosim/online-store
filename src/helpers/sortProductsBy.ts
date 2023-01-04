import { SortBy, SortDirection } from 'enums/SortingStrategy';
import { ProductItem } from 'types/ProductItem';
export const sortProductsBy = (
  products: ProductItem[],
  field: SortBy = SortBy.Price,
  direction: SortDirection = SortDirection.ASC,
): ProductItem[] => {
  switch (direction) {
    case SortDirection.ASC:
      return [...products].sort((a, b) => a[field] - b[field]);
    case SortDirection.DESC:
      return [...products].sort((a, b) => b[field] - a[field]);
    default:
      return null as never;
  }
};
