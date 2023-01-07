import styled from '@emotion/styled';
import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import currencyFormatter from 'helpers/currencyFormatter';
import percentageFormatter from 'helpers/percentageFormatter';
import React, { FC } from 'react';
import { ProductItem } from 'types/ProductItem';

import styles from './StoreCard.module.scss';

interface StoreItemProps {
  storeCardItem: ProductItem;
  children: string;
  key: string;
  onClick: () => void;
}

const StoreCard: FC<StoreItemProps> = ({ storeCardItem }) => {
  const { brand, category, discountPercentage, price, thumbnail, rating, stock } = storeCardItem;

  const Text = styled(Typography)`
    margin: 0;
    font-size: 14px;
  `;

  const Span = styled('span')`
    font-weight: 700;
  `;

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px',
        height: '350px',
        boxShadow: '2px 2px 5px grey',
      }}
    >
      <Paper elevation={12} className={styles.imageWrapper}>
        <CardMedia className={styles.imageWrapper} image={thumbnail} />
      </Paper>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: '100%',
          padding: '15px 15px 10px',
        }}
      >
        <Text>
          <Span>Category:</Span> {category}
        </Text>
        <Text>
          <Span>Brand:</Span> {brand}
        </Text>
        <Text>
          <Span>Price:</Span> {currencyFormatter.format(price)}
        </Text>
        <Text>
          <Span>Discount:</Span> {percentageFormatter.format(discountPercentage / 100)}
        </Text>
        <Text sx={{ display: 'flex', alignItems: 'center' }}>
          <Span>Rating: </Span>{' '}
          <Rating name="read-only" max={5} value={rating} precision={0.5} readOnly size="small" />
        </Text>
        <Text>
          <Span>Stock:</Span> {stock}
        </Text>
      </CardContent>
      <CardActions
        sx={{
          padding: '0',
        }}
      >
        <Button variant="outlined">Add to cart</Button>
        <Button variant="outlined">Details</Button>
      </CardActions>
    </Card>
  );
};

export default StoreCard;
