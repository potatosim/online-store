import { LocalStorageKeys } from 'enums/LocalStorageKeys';
import { setCartItemsToStorage, setPromoCodesToStorage } from './localStorageHelpers';

const mockItemsArr = [
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
    count: 3,
    productsTotalPrice: 1647,
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
    description: 'Samsung new variant which goes beyond Galaxy to the Universe',
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    images: ['https://i.dummyjson.com/data/products/3/thumbnail.jpg'],
    count: 1,
    productsTotalPrice: 1249,
  },
];

const mockPromoCodes = [{ name: 'Leon', discount: 10 }];

describe('local storage helper test', () => {
  test('should set array of items in local storage', () => {
    setCartItemsToStorage(mockItemsArr);
    expect(localStorage.getItem(LocalStorageKeys.CartItems)).toEqual(JSON.stringify(mockItemsArr));
  });

  test('should set promo codes in local storage', () => {
    setPromoCodesToStorage(mockPromoCodes);
    expect(localStorage.getItem(LocalStorageKeys.PromoCodes)).toEqual(
      JSON.stringify(mockPromoCodes),
    );
  });
});

afterAll(() => {
  localStorage.removeItem(LocalStorageKeys.CartItems);
  localStorage.removeItem(LocalStorageKeys.PromoCodes);
});
