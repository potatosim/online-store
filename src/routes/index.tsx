import Layout from 'components/Layout';
import CartPage from 'pages/CartPage/CartPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProductPage from 'pages/ProductPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/product-details/:id' element={<ProductPage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
