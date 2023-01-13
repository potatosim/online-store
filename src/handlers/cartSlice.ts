import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem } from 'types/CartItem';
import { ProductItem } from 'types/ProductItem';
import { PromoCode } from 'types/PromoCode';
import {
  getCartItemsFromStorage,
  getPromoCodesFromStorage,
  getTotalCount,
  getTotalPrice,
} from 'helpers/getCartStateFromStorage';
import { setCartItemsToStorage, setPromoCodesToStorage } from 'helpers/localStorageHelpers';

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  totalCount: number;
  isBuyNow: boolean;
  promoCodes: PromoCode[];
}

const initialState: CartState = {
  cartItems: getCartItemsFromStorage(),
  totalPrice: getTotalPrice(getCartItemsFromStorage()),
  totalCount: getTotalCount(getCartItemsFromStorage()),
  promoCodes: getPromoCodesFromStorage(),
  isBuyNow: false,
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
        setCartItemsToStorage(state.cartItems);
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
        setCartItemsToStorage(state.cartItems);
      }
    },
    addProductToCart(state, { payload }: PayloadAction<ProductItem>) {
      state.cartItems.push({ ...payload, count: 1, productsTotalPrice: payload.price });
      state.totalPrice += payload.price;
      state.totalCount += 1;
      setCartItemsToStorage(state.cartItems);
    },
    removeProductFromCart(state, { payload }: PayloadAction<{ id: number }>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
      state.totalPrice = getTotalPrice(state.cartItems);
      state.totalCount = getTotalCount(state.cartItems);
      setCartItemsToStorage(state.cartItems);
    },
    setIsBuyNow(state, { payload }: PayloadAction<boolean>) {
      state.isBuyNow = payload;
    },
    resetCartState(state) {
      state.totalCount = 0;
      state.totalPrice = 0;
      state.cartItems = [];
      state.promoCodes = [];
      setCartItemsToStorage(state.cartItems);
      setPromoCodesToStorage(state.promoCodes);
    },
    addPromoCode(state, { payload }: PayloadAction<PromoCode>) {
      state.promoCodes.push(payload);
      setPromoCodesToStorage(state.promoCodes);
    },
    removePromoCode(state, { payload }: PayloadAction<PromoCode>) {
      state.promoCodes = state.promoCodes.filter((promoCode) => promoCode.name !== payload.name);
      setPromoCodesToStorage(state.promoCodes);
    },
  },
});

export const {
  incrementCount,
  decrementCount,
  addProductToCart,
  removeProductFromCart,
  setIsBuyNow,
  resetCartState,
  addPromoCode,
  removePromoCode,
} = cartSlice.actions;

export default cartSlice.reducer;
