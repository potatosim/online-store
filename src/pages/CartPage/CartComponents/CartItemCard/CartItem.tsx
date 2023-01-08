import {
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { decrementCount, incrementCount } from 'handlers/cartSlice';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CartItem } from 'types/CartItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import currencyFormatter from 'helpers/currencyFormatter';
import percentageFormatter from 'helpers/percentageFormatter';
import { useAppDispatch } from 'hooks/reduxHooks';

import styles from './CartItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'enums/RoutePaths';
import Button from '@mui/material/Button';

interface CartItemProps {
  cartItem: CartItem;
  index: number;
}

const CartItemCard: FC<CartItemProps> = ({ cartItem, index }) => {
  const {
    title,
    description,
    rating,
    discountPercentage,
    stock,
    thumbnail,
    count,
    id,
    productsTotalPrice,
  } = cartItem;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card elevation={8} className={styles.itemWrapper}>
      <Badge badgeContent={index} color="secondary" className={styles.cardBadge}></Badge>
      <Paper elevation={12} className={styles.imageWrapper}>
        <CardMedia image={thumbnail} />
      </Paper>
      <CardContent className={styles.cardContent}>
        <Typography variant="h5" fontWeight={600} textAlign="center">
          {title}
        </Typography>
        <ListItemButton onClick={handleOpen}>
          <ListItemText primary="Description" />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen}>
          <Typography>
            {description}
            <br />
            <Button onClick={() => navigate(`${RoutePaths.ProductPage}/${id}`)}>More...</Button>
          </Typography>
        </Collapse>
        <Paper className={styles.productProps}>
          <Paper className={styles.descriptionItem} elevation={12}>
            Rating: <Rating name="read-only" max={5} value={rating} precision={0.5} readOnly />
          </Paper>
          <Paper className={styles.descriptionItem} elevation={12}>
            Discount: {percentageFormatter.format(discountPercentage / 100)}
          </Paper>
          <Paper className={styles.descriptionItem} elevation={12}>
            Stock: {stock}
          </Paper>
        </Paper>
      </CardContent>
      <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
        <IconButton onClick={() => dispatch(decrementCount({ id }))}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="h5" textAlign="center" sx={{ minWidth: '50px' }}>
          {count}
        </Typography>
        <IconButton onClick={() => dispatch(incrementCount({ id }))}>
          <AddCircleOutlineIcon />
        </IconButton>
      </CardActions>
      <Typography variant="h5" fontWeight={600}>
        {currencyFormatter.format(productsTotalPrice)}
      </Typography>
    </Card>
  );
};

export default React.memo(CartItemCard);
