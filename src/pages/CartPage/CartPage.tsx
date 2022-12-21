import CartItems from 'components/Cart/CartItems';
import PageHeader from 'components/PageHeader';
import { useAppSelector } from 'hooks/reduxHooks';
import React from 'react';

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  if (!cartItems.length) {
    return (
      <PageHeader variant="h1" fontWeight={500}>
        The cart is empty
      </PageHeader>
    );
  }

  return <CartItems cartItems={cartItems} />;
};

export default CartPage;
