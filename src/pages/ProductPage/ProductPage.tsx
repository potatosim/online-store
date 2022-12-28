import styled from '@emotion/styled';
import { Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from 'data';
import { ProductItem } from 'types/ProductItem';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { addProductToCart, removeProductFromCart, setIsBuyNow } from 'handlers/cartSlice';
import BreadCrumbs from 'components/Breadcrumbs';
import ProductGallery from 'components/ProductGallery';
import ProductDescription from 'components/ProductDescription';

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

  const navigate = useNavigate();

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
        <ProductGallery images={product.images} thumbnail={product.thumbnail} />
        <ProductText>
          <ProductDescription product={product} />
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
            <IconButton
              onClick={() => {
                dispatch(addProductToCart(product));
                dispatch(setIsBuyNow(true));
                navigate('/cart');
              }}
            >
              Buy now
            </IconButton>
          </ButtonWrapper>
        </ProductText>
      </ProductContent>
    </PageContent>
  );
};

export default ProductPage;
