import styled from '@emotion/styled';
import { Box, Rating, Typography } from '@mui/material';
import currencyFormatter from 'helpers/currencyFormatter';
import percentageFormatter from 'helpers/percentageFormatter';
import React from 'react';
import { ProductItem } from 'types/ProductItem';

const ProductAbout = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const Span = styled('span')(() => ({
  fontWeight: '700',
  fontSize: '1.1rem',
}));

interface IDescriptionProps {
  product: ProductItem;
}

const ProductDescription = (props: IDescriptionProps) => {
  return (
    <div>
      <Typography variant="h5" fontWeight={600} textAlign="center" textTransform="capitalize">
        {props.product.title}
      </Typography>
      <Typography
        sx={{ maxWidth: '320px', textAlign: 'center', margin: '10px auto 10px', fontSize: '1.1rem' }}
      >
        {props.product.description}
      </Typography>
      <ProductAbout>
        <Typography>
          <Span>Discount Percentage: </Span>
          {percentageFormatter.format(props.product.discountPercentage / 100)}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <Span>Rating: </Span>
          <Rating name="read-only" max={5} value={props.product.rating} precision={0.5} readOnly />
        </Typography>
        <Typography>
          <Span>Stock: </Span>
          {props.product.stock}
        </Typography>
        <Typography>
          <Span>Brand: </Span>
          {props.product.brand}
        </Typography>
        <Typography>
          <Span>Category: </Span>
          {props.product.category}
        </Typography>
      </ProductAbout>
      <Typography variant="h5" fontWeight={600} margin="20px 0 20px 0" textAlign="center">
        {currencyFormatter.format(props.product.price)}
      </Typography>
    </div>
  );
};

export default ProductDescription;
