import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ProductItem } from 'types/ProductItem';
import capitalize from 'helpers/capitalize';

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

type BreadCrumbsProps = Pick<ProductItem, 'category' | 'brand' | 'title'>;

const BreadCrumbs = ({ category, brand, title }: BreadCrumbsProps) => {
  return (
    <MyBreadCrumbs>
      <MenuLink to="">Store</MenuLink>
      <MenuLink to="">{capitalize(category)}</MenuLink>
      <MenuLink to="">{capitalize(brand)}</MenuLink>
      <Typography sx={{ color: 'orange', fontWeight: '500', fontSize: '1.2rem' }}>
        {capitalize(title)}
      </Typography>
    </MyBreadCrumbs>
  );
};

export default BreadCrumbs;
