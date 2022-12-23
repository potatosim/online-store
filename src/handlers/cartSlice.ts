import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICartItem } from 'types/CartItem';
import { LocalStorageKeys } from './../enums/LocalStorageKeys';
import { ProductItem } from 'types/ProductItem';

export interface CartState {
  cartItems: ICartItem[];
  totalPrice: number;
  totalCount: number;
}

const getTotalPrice = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((acc, cur) => acc + cur.price * cur.count, 0);
};

const getTotalCount = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((acc, cur) => acc + cur.count, 0);
};

const dataFromStorage =
  (JSON.parse(localStorage.getItem(LocalStorageKeys.CartItems) as string) as ICartItem[]) || [];

const initialState: CartState = {
  cartItems: dataFromStorage,
  totalPrice: getTotalPrice(dataFromStorage),
  totalCount: getTotalCount(dataFromStorage),
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
          state.totalCount += 1;
          cartItem.productsTotalPrice += cartItem.price;
        }
        localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(state.cartItems));
      }
    },
    decrementCount(state, { payload }: PayloadAction<{ id: number }>) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.count -= 1;
        state.totalPrice -= cartItem.price;
        cartItem.productsTotalPrice -= cartItem.price;
        state.totalCount -= 1;
        if (cartItem.count === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
        }
        localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(state.cartItems));
      }
    },
    addProductToCart(state, { payload }: PayloadAction<ProductItem>) {
      state.cartItems.push({ ...payload, count: 1, productsTotalPrice: payload.price });
      state.totalPrice += payload.price;
      state.totalCount += 1;
      localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(state.cartItems));
    },
    removeProductFromCart(state, { payload }: PayloadAction<{ id: number }>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
      state.totalPrice = getTotalPrice(state.cartItems);
      state.totalCount = getTotalCount(state.cartItems);
      localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(state.cartItems));
    },
  },
});

export const { incrementCount, decrementCount, addProductToCart, removeProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
