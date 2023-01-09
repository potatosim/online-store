import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  addBrandsFromQuery,
  addCategoriesFromQuery,
  applyFilters,
  changePrice,
  changeSearchValue,
  changeSort,
  changeStock,
  resetFilters,
} from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import useQueryParam from 'hooks/useQueryParam';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import StoreCard from './StoreCard';
import { SortBy, SortDirection } from 'enums/SortingStrategy';

import { parseQuery } from 'helpers/queryHelpers';
import Filters from './Filters';
import CardsWrapper from './CardsWrapper';
import { Button, ButtonGroup, Paper, Typography } from '@mui/material';
import { CardsLayout } from 'enums/CardsLayout';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridViewIcon from '@mui/icons-material/GridView';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import getUpdatedUrl from 'helpers/getUpdatedUrl';

const StorePageWrapper = styled('div')`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  row-gap: 1rem;
  width: 100%;
`;

const HeaderWrapper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StorePage = () => {
  const { filteredItems } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const categoryQuery = useQueryParam(FiltersQueryNames.Category);
  const brandQuery = useQueryParam(FiltersQueryNames.Brand);
  const priceQuery = useQueryParam(FiltersQueryNames.Price);
  const stockQuery = useQueryParam(FiltersQueryNames.Stock);
  const searchQuery = useQueryParam(FiltersQueryNames.Search);
  const sortDirectionQuery = useQueryParam(FiltersQueryNames.SortDirection);
  const sortFieldQuery = useQueryParam(FiltersQueryNames.SortField);
  const viewQuery = useQueryParam(FiltersQueryNames.View);

  const { cartItems } = useAppSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);
  const [cardsLayout, setCardsLayout] = useState<CardsLayout>(CardsLayout.First);

  useLayoutEffect(() => {
    if (viewQuery) {
      setCardsLayout(viewQuery as CardsLayout);
    }
  }, []);

  useEffect(() => {
    if (categoryQuery) {
      const categoriesFromQuery = parseQuery(categoryQuery);
      dispatch(addCategoriesFromQuery(categoriesFromQuery));
    }
    if (brandQuery) {
      const brandsFromQuery = parseQuery(brandQuery);
      dispatch(addBrandsFromQuery(brandsFromQuery));
    }
    if (priceQuery) {
      const [min, max] = parseQuery<number>(priceQuery);
      dispatch(changePrice({ min, max }));
    }
    if (stockQuery) {
      const [min, max] = parseQuery<number>(stockQuery);
      dispatch(changeStock({ min, max }));
    }
    if (searchQuery) {
      dispatch(changeSearchValue(searchQuery));
    }
    if (sortDirectionQuery && sortFieldQuery) {
      dispatch(
        changeSort({
          direction: sortDirectionQuery as SortDirection,
          field: sortFieldQuery as SortBy,
        }),
      );
    }

    dispatch(applyFilters());

    return () => {
      dispatch(resetFilters());
    };
  }, []);

  const isButtonActive = (btnLayout: CardsLayout) => {
    return cardsLayout === btnLayout ? 'primary' : 'disabled';
  };

  return (
    <StorePageWrapper>
      <HeaderWrapper>
        <Button onClick={() => setIsOpen(true)} sx={{ fontSize: '1rem' }}>
          Filters
        </Button>
        <ButtonGroup variant="contained">
          <IconButton
            onClick={() => {
              setCardsLayout(CardsLayout.First);
              getUpdatedUrl(CardsLayout.First);
            }}
          >
            <GridOnIcon color={isButtonActive(CardsLayout.First)} />
          </IconButton>
          <IconButton
            onClick={() => {
              setCardsLayout(CardsLayout.Second);
              getUpdatedUrl(CardsLayout.Second);
            }}
          >
            <GridViewIcon color={isButtonActive(CardsLayout.Second)} />
          </IconButton>
        </ButtonGroup>
      </HeaderWrapper>
      <Filters isOpen={isOpen} setIsOpen={setIsOpen} />
      <Paper sx={{ padding: '1rem' }}>
        <Typography fontWeight={600} fontSize="1.5rem">
          Found: {filteredItems.length}
        </Typography>
      </Paper>
      {filteredItems.length ? (
        <CardsWrapper cardsLayout={cardsLayout}>
          {filteredItems.map((item) => (
            <StoreCard
              inCart={cartItems.some((cartItem) => cartItem.id === Number(item.id))}
              storeCardItem={item}
              key={item.thumbnail}
            />
          ))}
        </CardsWrapper>
      ) : (
        <Typography variant="h2">Products not Found</Typography>
      )}
    </StorePageWrapper>
  );
};

export default StorePage;
