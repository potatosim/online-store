import CartItem from 'components/Cart/CartItem';
import PageHeader from 'components/PageHeader';
import { useAppSelector } from 'hooks/reduxHooks';
import React from 'react';
// import styles from './CartPage.module.scss';

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
    <div
      style={{
        display: 'flex',
        alignSelf: 'flex-start',
        gap: '2rem',
        width: '70%',
        padding: '32px',
        flexWrap: 'wrap',
      }}
    >
      {cartItems.map((cartItem, i) => (
        <CartItem key={i} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default CartPage;
