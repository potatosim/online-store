import { ProductItem } from './ProductItem';

export interface ICartItem extends ProductItem {
  count: number;
  productsTotalPrice: number;
}
