import PageHeader from 'components/PageHeader';
import { useAppSelector } from 'hooks/reduxHooks';
import React from 'react';
import CartItems from './CartComponents/CartItems';
import CartSummary from './CartComponents/CartSummary';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  if (!cartItems.length) {
    return (
      <PageHeader variant="h1" fontWeight={500}>
        The cart is empty
      </PageHeader>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <CartItems cartItems={cartItems} />
      <CartSummary />
    </div>
  );
};

export default CartPage;
