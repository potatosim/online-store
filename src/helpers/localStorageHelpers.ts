import { LocalStorageKeys } from 'enums/LocalStorageKeys';
import { CartItem } from 'types/CartItem';
import { PromoCode } from 'types/PromoCode';

export const setCartItemsToStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(LocalStorageKeys.CartItems, JSON.stringify(cartItems));
};

export const setPromoCodesToStorage = (promoCodes: PromoCode[]) => {
  localStorage.setItem(LocalStorageKeys.PromoCodes, JSON.stringify(promoCodes));
};
