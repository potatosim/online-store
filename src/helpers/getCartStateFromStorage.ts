import { LocalStorageKeys } from 'enums/LocalStorageKeys';
import { CartItem } from 'types/CartItem';
import { PromoCode } from 'types/PromoCode';

export const getCartItemsFromStorage = () => {
  return (
    (JSON.parse(localStorage.getItem(LocalStorageKeys.CartItems) as string) as CartItem[]) || []
  );
};

export const getTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((acc, cur) => acc + cur.price * cur.count, 0);
};

export const getTotalCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((acc, cur) => acc + cur.count, 0);
};

export const getPromoCodesFromStorage = () => {
  return (
    (JSON.parse(localStorage.getItem(LocalStorageKeys.PromoCodes) as string) as PromoCode[]) || []
  );
};
