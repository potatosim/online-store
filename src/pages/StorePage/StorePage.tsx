import React, { useEffect } from 'react';
import {
  addBrandsFromQuery,
  addCategoriesFromQuery,
  applyFilters,
  changePrice,
  changeSearchValue,
  changeSort,
  changeStock,
} from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import useQueryParam from 'hooks/useQueryParam';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import StoreCard from './StoreCard';
import { SortBy, SortDirection } from 'enums/SortingStrategy';

import { parseQuery } from 'helpers/queryHelpers';
import Filters from './Filters';
import CardsWrapper from './CardsWrapper';

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

  const { cartItems } = useAppSelector((state) => state.cart);

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
  }, []);

  return (
    <>
      <Filters />
      <CardsWrapper>
        {filteredItems.map((item) => (
          <StoreCard
            inCart={cartItems.some((cartItem) => cartItem.id === Number(item.id))}
            storeCardItem={item}
            key={item.thumbnail}
          />
        ))}
      </CardsWrapper>
    </>
  );
};

export default StorePage;
