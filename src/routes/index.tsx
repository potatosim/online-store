import Layout from 'components/Layout';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
