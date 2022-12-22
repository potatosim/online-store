import React, { FC, useEffect, useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';
import CartItem from 'pages/CartPage/CartComponents/CartItem';
import { ICartItem } from 'types/CartItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import getPageItems from 'helpers/getPageItems';
import getPagesCount from 'helpers/getPagesCount';
import useQueryParam from 'hooks/useQueryParam';
import { useSearchParams } from 'react-router-dom';

import styles from './CartItems.module.scss';

interface CartItemsProps {
  cartItems: ICartItem[];
}

enum CartPageQueryParams {
  Limit = '_limit',
  Page = '_page',
}

const DEFAULT_LIMIT = 3;
const DEFAULT_PAGE = 1;

const CartItems: FC<CartItemsProps> = ({ cartItems }) => {
  const [limitValue, setLimitValue] = useState<number>(DEFAULT_LIMIT);
  const [pagesCount, setPagesCount] = useState<number>(
    getPagesCount(cartItems.length, DEFAULT_LIMIT),
  );
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [itemsToShow, setItemsToShow] = useState(
    getPageItems(cartItems, DEFAULT_LIMIT, DEFAULT_PAGE),
  );
  const [query, setQuery] = useSearchParams();

  const queryLimit = useQueryParam(CartPageQueryParams.Limit);
  const queryPage = useQueryParam(CartPageQueryParams.Page);

  useLayoutEffect(() => {
    if (queryLimit) {
      setLimitValue(+queryLimit || DEFAULT_LIMIT);
    }
    if (queryPage) {
      setPage(+queryPage || DEFAULT_PAGE);
    }
  }, []);

  useEffect(() => {
    query.set(CartPageQueryParams.Limit, limitValue.toString());
    query.set(CartPageQueryParams.Page, page.toString());
    setQuery(query);
  }, [limitValue, page]);

  useEffect(() => {
    if (limitValue === 0) {
      setPagesCount(1);
    } else {
      setPagesCount(getPagesCount(cartItems.length, limitValue));
    }
  }, [limitValue, cartItems]);

  useEffect(() => {
    if (page > pagesCount) {
      setPage(pagesCount || DEFAULT_PAGE);
    }
  }, [pagesCount]);

  useEffect(() => {
    if (limitValue === 0) {
      setItemsToShow(getPageItems(cartItems, cartItems.length, page));
    } else {
      setItemsToShow(getPageItems(cartItems, limitValue, page));
    }
  }, [limitValue, page, cartItems]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimitValue(+e.target.value.replace(/\D/gim, ''));
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.headerWrapper}>
        <Paper className={styles.numberPerPageWrapper}>
          <TextField
            color="secondary"
            focused
            label="Limit"
            value={limitValue}
            onChange={handleChangeInput}
          />
        </Paper>
        <Paper className={styles.numberPerPageWrapper}>
          <Pagination
            onChange={(_, newPage) => setPage(newPage)}
            page={page}
            count={pagesCount}
            variant="outlined"
            color="secondary"
            size="large"
          />
        </Paper>
      </Box>
      <Box className={styles.cartItemsWrapper}>
        {itemsToShow.map((cartItem, i) => (
          <CartItem index={cartItems.indexOf(cartItem) + 1} key={i} cartItem={cartItem} />
        ))}
      </Box>
    </Box>
  );
};

export default CartItems;
