/* eslint-disable */
import styled from '@emotion/styled';
import { Box, Button, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from 'data';
import { FC } from 'react';
import ComponentWithChildren from 'types/ComponentWithChildren';
import { ProductItem } from 'types/ProductItem';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { addProductToCart, removeProductFromCart } from 'handlers/cartSlice';
import currencyFormatter from 'helpers/currencyFormatter';
import percentageFormatter from 'helpers/percentageFormatter';
import BreadCrumbs from 'components/Breadcrumbs';
import Gallery from 'components/Gallery';

const PageContent = styled(Box)(() => ({
  margin: '10px auto',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ProductContent = styled(Box)(() => ({
  display: 'flex',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '80%',
}));

const ProductText = styled(Box)(() => ({
  marginLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProductAbout = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const Span = styled('span')(() => ({
  fontWeight: '700',
  fontSize: '1.1rem',
}));

const ButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
}));

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductItem | null>(null);

  const { id } = useParams();

  useEffect(() => {
    setIsProductInCart(cartItems.some((cartItem) => cartItem.id === Number(id)));
  }, [cartItems, id]);

  // TODO: implement types for useParams
  useEffect(() => {
    if (id) {
      const targetElement = data.products.find((el) => Number(id) === el.id);
      if (targetElement) {
        setProduct(targetElement);
      } else {
        setProduct(null);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <PageContent>
      <BreadCrumbs title={product.title} brand={product.brand} category={product.category} />
      <ProductContent>
        <Gallery images={product.images} thumbnail={product.thumbnail} />
        <ProductText>
          <Typography variant="h5" fontWeight={600} textAlign="center" textTransform="capitalize">
            {product.title}
          </Typography>
          <Typography
            sx={{ maxWidth: '320px', textAlign: 'center', margin: '10px auto', fontSize: '1.1rem' }}
          >
            {product.description}
          </Typography>
          <ProductAbout>
            <Typography>
              <Span>Discount Percentage: </Span>
              {percentageFormatter.format(product.discountPercentage / 100)}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <Span>Rating: </Span>
              <Rating name="read-only" max={5} value={product.rating} precision={0.5} readOnly />
            </Typography>
            <Typography>
              <Span>Stock: </Span>
              {product.stock}
            </Typography>
            <Typography>
              <Span>Brand: </Span>
              {product.brand}
            </Typography>
            <Typography>
              <Span>Category: </Span>
              {product.category}
            </Typography>
          </ProductAbout>
          <Typography variant="h5" fontWeight={600} margin="20px 0 20px 0">
            {currencyFormatter.format(product.price)}
          </Typography>
          <ButtonWrapper>
            {isProductInCart ? (
              <Button
                variant="outlined"
                onClick={() => dispatch(removeProductFromCart({ id: product.id }))}
              >
                Remove from cart
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => dispatch(addProductToCart(product))}>
                Add to cart
              </Button>
            )}
            <Button variant="outlined">Buy now</Button>
          </ButtonWrapper>
        </ProductText>
      </ProductContent>
    </PageContent>
  );
};

export default ProductPage;
