import { ProductItem } from './ProductItem';

export interface CartItem extends ProductItem {
  count: number;
  productsTotalPrice: number;
}
