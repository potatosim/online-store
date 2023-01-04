import { Button, Card, CardActions, CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper/Paper';
import React, { FC } from 'react';
import { ProductItem } from 'types/ProductItem';

import styles from './StoreCard.module.scss';

interface StoreItemProps {
  storeCardItem: ProductItem;
}

const StoreCard: FC<StoreItemProps> = ({ storeCardItem }) => {
  const { brand, category, discountPercentage, price, thumbnail, rating, stock } = storeCardItem;
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={12} className={styles.imageWrapper}>
        <CardMedia className={styles.imageWrapper} image={thumbnail} />
      </Paper>
      <CardContent>{brand + category + discountPercentage + price + rating + stock}</CardContent>
      <CardActions>
        <Button>Add to cart</Button>
        <Button>Details</Button>
      </CardActions>
    </Card>
  );
};

export default StoreCard;
