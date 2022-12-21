import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from 'data';

export interface ICartItem extends ProductItem {
  count: number;
  productsTotalPrice: number;
}

export interface CartState {
  cartItems: ICartItem[];
  totalPrice: number;
}

// TODO remove shit
const mockCartItems = [
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
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
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
    count: 1,
    productsTotalPrice: 899,
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
    images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    count: 1,
    productsTotalPrice: 1249,
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

const getTotalPrice = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((acc, cur) => acc + cur.price * cur.count, 0);
};

const initialState: CartState = {
  cartItems: mockCartItems,
  totalPrice: getTotalPrice(mockCartItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementCount(state, { payload }: PayloadAction<{ id: number }>) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.count += 1;
        if (cartItem.count > cartItem.stock) {
          cartItem.count = cartItem.stock;
        } else {
          state.totalPrice += cartItem.price;
          cartItem.productsTotalPrice += cartItem.price;
        }
      }
    },
    decrementCount(state, { payload }: PayloadAction<{ id: number }>) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.count -= 1;
        state.totalPrice -= cartItem.price;
        cartItem.productsTotalPrice -= cartItem.price;
        if (cartItem.count === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
        }
      }
    },
    addProductToCart(state, { payload }: PayloadAction<ProductItem>) {
      state.cartItems.push({ ...payload, count: 1, productsTotalPrice: payload.price });
      state.totalPrice += payload.price;
    },
    removeProductFromCart(state, { payload }: PayloadAction<{ id: number }>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
      state.totalPrice = getTotalPrice(state.cartItems);
    },
  },
});

export const { incrementCount, decrementCount, addProductToCart, removeProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
