/* eslint-disable */
import {
  getCartItemsFromStorage,
  getPromoCodesFromStorage,
  getTotalCount,
  getTotalPrice,
} from './getCartStateFromStorage';

import { CartItem } from 'types/CartItem';
import { LocalStorageKeys } from 'enums/LocalStorageKeys';
import { PromoCode } from 'types/PromoCode';

const MOCKED_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
    count: 1,
    productsTotalPrice: 549,
  },
  {
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
    count: 2,
    productsTotalPrice: 1798,
  },
  {
    id: 3,
    title: 'Samsung Universe 9',
    description: "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    images: ['https://i.dummyjson.com/data/products/3/thumbnail.jpg'],
    count: 3,
    productsTotalPrice: 4497,
  },
  {
    id: 4,
    title: 'OPPOF19',
    description: 'OPPO F19 is officially announced on April 2021.',
    price: 280,
    discountPercentage: 17.91,
    rating: 4.3,
    stock: 123,
    brand: 'OPPO',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/4/1.jpg',
      'https://i.dummyjson.com/data/products/4/2.jpg',
      'https://i.dummyjson.com/data/products/4/3.jpg',
      'https://i.dummyjson.com/data/products/4/4.jpg',
      'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
    ],
    count: 1,
    productsTotalPrice: 280,
  },
];

const TOTAL_PRICE = 6374;

const TOTAL_COUNT = 7;

const MOCKED_PROMO_CODES: PromoCode[] = [
  { name: 'hanna', discount: 10 },
  { name: 'leon', discount: 10 },
  { name: 'denis', discount: 10 },
];

describe('test getCartStateFromLocalStorage helpers', () => {
  describe('localStorage tests', () => {
    beforeAll(() => {
      localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(MOCKED_CART_ITEMS));

      localStorage.setItem(LocalStorageKeys.PromoCodes, JSON.stringify(MOCKED_PROMO_CODES));
    });

    afterAll(() => {
      localStorage.clear();
    });

    it('should return cart items from storage', () => {
      expect(getCartItemsFromStorage()).toEqual(MOCKED_CART_ITEMS);
    });

    it('should return promo codes from storage', () => {
      expect(getPromoCodesFromStorage()).toEqual(MOCKED_PROMO_CODES);
    });
  });

  it('should return correct total price', () => {
    expect(getTotalPrice(MOCKED_CART_ITEMS)).toBe(TOTAL_PRICE);
  });

  it('should return correct total count', () => {
    expect(getTotalCount(MOCKED_CART_ITEMS)).toBe(TOTAL_COUNT);
  });
});
