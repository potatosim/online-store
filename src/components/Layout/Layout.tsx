import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import Footer from './Footer';
import Header from './Header';

const LayoutWrapper = styled(Box)({});

const TopContentWrapper = styled(Box)({});

const Layout = () => {
  return (
    <LayoutWrapper>
      <TopContentWrapper>
        <Header />

        <Outlet />

        <Footer />
      </TopContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
