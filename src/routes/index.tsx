import Layout from 'components/Layout';
import CartPage from 'pages/CartPage/CartPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
