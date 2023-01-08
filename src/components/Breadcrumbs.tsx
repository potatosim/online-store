import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ProductItem } from 'types/ProductItem';
import capitalize from 'helpers/capitalize';
import { RoutePaths } from 'enums/RoutePaths';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';

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
  cursor: 'pointer',
}));

type BreadCrumbsProps = Pick<ProductItem, 'category' | 'brand' | 'title'>;

const BreadCrumbs = ({ category, brand, title }: BreadCrumbsProps) => {
  return (
    <MyBreadCrumbs>
      <MenuLink to={RoutePaths.Index}>Store</MenuLink>
      <MenuLink to={`${RoutePaths.Index}?${FiltersQueryNames.Category}=${category.toLowerCase()}`}>
        {capitalize(category)}
      </MenuLink>
      <MenuLink to={`${RoutePaths.Index}?${FiltersQueryNames.Brand}=${brand.toLowerCase()}`}>
        {capitalize(brand)}
      </MenuLink>
      <Typography sx={{ color: 'orange', fontWeight: '500', fontSize: '1.2rem' }}>
        {capitalize(title)}
      </Typography>
    </MyBreadCrumbs>
  );
};

export default BreadCrumbs;
