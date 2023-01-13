import { ProductItem } from './ProductItem';

export interface ProductData {
  total: number;
  skip: 0;
  limit: number;
  products: ProductItem[];
}
