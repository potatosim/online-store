import styled from '@emotion/styled';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import { RoutePaths } from 'enums/RoutePaths';
import { addProductToCart, removeProductFromCart } from 'handlers/cartSlice';
import currencyFormatter from 'helpers/currencyFormatter';
import percentageFormatter from 'helpers/percentageFormatter';
import { useAppDispatch } from 'hooks/reduxHooks';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from 'types/ProductItem';

import styles from './StoreCard.module.scss';

interface StoreItemProps {
  storeCardItem: ProductItem;
  inCart: boolean;
}

const Text = styled(Typography)`
  margin: 0;
  font-size: 14px;
`;

const Span = styled('span')`
  font-weight: 700;
`;

const StoreCard: FC<StoreItemProps> = ({ storeCardItem, inCart }) => {
  const { brand, category, discountPercentage, price, thumbnail, rating, stock, id } =
    storeCardItem;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '2px 2px 5px grey',
        pb: 2,
      }}
    >
      <Paper elevation={12} className={styles.imageWrapper}>
        <CardMedia image={thumbnail} />
      </Paper>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: '100%',
          padding: '1rem',
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
        {inCart ? (
          <Button variant="outlined" onClick={() => dispatch(removeProductFromCart({ id }))}>
            Remove from cart
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => dispatch(addProductToCart(storeCardItem))}>
            Add to cart
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`${RoutePaths.ProductPage}/${id}`);
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(StoreCard);
