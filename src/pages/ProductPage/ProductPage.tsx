/* eslint-disable */
import styled from '@emotion/styled';
import { Box, Breadcrumbs, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from 'data';
import { FC } from 'react';
import ComponentWithChildren from 'types/ComponentWithChildren';
import { ProductItem } from 'types/ProductItem';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { addProductToCart, removeProductFromCart } from 'handlers/cartSlice';

const PageContent = styled(Box)(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-around',
}));

const BreadCrumbs = styled(Breadcrumbs)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '15px',
}));

const MenuLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'orange',
  cursor: 'pointer',
}));

const ProductContent = styled(Box)(() => ({
  display: 'flex',
  backgroundColor: 'white',
  padding: '15px',
}));

const ThumbnailWrapper: FC<ComponentWithChildren> = styled(ImageListItem)(() => ({
  height: '100px',
  width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  border: '1px solid grey',
}));

const Thumbnail = styled('img')(() => ({
  width: '100%',
  height: 'auto',
}));

const ImageWrapper = styled(Box)(() => ({
  width: '400px',
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  border: '1px solid grey',
}));

const MainImage = styled('img')(() => ({
  width: '100%',
  height: 'auto',
}));

const ProductText = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProductAbout = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}));

const ButtonWrapper = styled(Box)(() => ({
  display: 'flex',
}));

const ProductPage = () => {
  const { cartItems } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
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
      targetElement ? setProduct(targetElement) : setProduct(null);
    }
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <PageContent>
      <BreadCrumbs>
        <MenuLink to="/product-details/1">Store</MenuLink>
        <MenuLink to="/product-details/2">{product.category}</MenuLink>
        <MenuLink to="/3">{product.brand}</MenuLink>
        <Typography sx={{ color: 'white' }}>{product.title}</Typography>
      </BreadCrumbs>
      <ProductContent>
        <ImageList cols={1} rowHeight={100} sx={{ height: '400px' }}>
          {product.images.map((el, i) => {
            return (
              <ThumbnailWrapper key={i}>
                <Thumbnail src={product.images[i]} />
              </ThumbnailWrapper>
            );
          })}
        </ImageList>
        <ImageWrapper>
          <MainImage alt="product photo" src={product.thumbnail} />
        </ImageWrapper>
        <ProductText>
          <Typography>{product.title}</Typography>
          <Typography>{product.description}</Typography>
          <ProductAbout>
            <Typography>Discount Percentage: {product.discountPercentage}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography>Stock: {product.stock}</Typography>
            <Typography>Brand: {product.brand}</Typography>
            <Typography>Category: {product.category}</Typography>
          </ProductAbout>
          <Typography>€{product.price}</Typography>
          <ButtonWrapper>
            {isProductInCart ? (
              <IconButton onClick={() => dispatch(removeProductFromCart({ id: product.id }))}>Remove from cart</IconButton>
            ) : (
              <IconButton onClick={() => dispatch(addProductToCart(product))}>
                Add to cart
              </IconButton>
            )}
            <IconButton>Buy now</IconButton>
          </ButtonWrapper>
        </ProductText>
      </ProductContent>
    </PageContent>
  );
};

export default ProductPage;
