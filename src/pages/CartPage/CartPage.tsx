import PageHeader from 'components/PageHeader';
import { useAppSelector } from 'hooks/reduxHooks';
import React from 'react';
import BuyModal from './BuyModal';
import CartItems from './CartComponents/CartItems';
import CartSummary from './CartComponents/CartSummary';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <BuyModal />
      {cartItems.length ? (
        <div className={styles.cartWrapper}>
          <CartItems cartItems={cartItems} />
          <CartSummary />
        </div>
      ) : (
        <PageHeader variant="h1" fontWeight={500}>
          The cart is empty
        </PageHeader>
      )}
    </>
  );
};

export default CartPage;
