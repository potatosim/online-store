import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ProductItem } from 'types/ProductItem';

const MyBreadCrumbs = styled(Breadcrumbs)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
}));

const MenuLink = styled(Link)(() => ({
  fontWeight: '500',
  fontSize: '1.2rem',
  textDecoration: 'none',
  color: 'orange',
  cursor: 'pointer',
}));

type BreadCrumbsProps = Pick<ProductItem, 'category' | 'brand' | 'title'>

const BreadCrumbs = ({ category, brand, title }: BreadCrumbsProps) => {
  return (
    <MyBreadCrumbs>
      <MenuLink to="/product-details/1">Store</MenuLink>
      <MenuLink to="/product-details/2">{category}</MenuLink>
      <MenuLink to="/product-details/3">{brand}</MenuLink>
      <Typography sx={{ color: 'white', fontWeight: '500', fontSize: '1.2rem' }}>
        {title}
      </Typography>
    </MyBreadCrumbs>
  );
};

export default BreadCrumbs;
