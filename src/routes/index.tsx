import Layout from 'components/Layout';
import CartPage from 'pages/CartPage/CartPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProductPage from 'pages/ProductPage';
import StorePage from 'pages/StorePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from 'enums/RoutePaths';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Index} element={<Layout />}>
        <Route index element={<StorePage />} />
        <Route path={RoutePaths.Store} element={<StorePage />} />
        <Route path={RoutePaths.CartPage} element={<CartPage />} />
        <Route path={RoutePaths.NotFoundPage} element={<NotFoundPage />} />
        <Route path={`/${RoutePaths.ProductPage}/:id`} element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
