import { Slider, Typography } from '@mui/material';
import { applyFilters, changePrice } from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect, useState } from 'react';

import FilterHeader from 'components/FilterHeader';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { convertToQuery } from 'helpers/queryHelpers';
import currencyFormatter from 'helpers/currencyFormatter';
import { getMinMaxValues } from 'handlers/getMinMaxValues';
import { getSliderWrapper } from 'helpers/getSliderWrapper';
import { useSearchParams } from 'react-router-dom';

const MIN_PRICE = 10;
const MAX_PRICE = 1749;

const StyledWrapper = getSliderWrapper('price');

const FilterByPrice = () => {
  const [priceValue, setPriceValue] = useState<number[]>([MIN_PRICE, MAX_PRICE]);
  const { filteredItems } = useAppSelector((state) => state.filters);
  const { price } = useAppSelector((state) => state.filters.selectedFilters);
  const [query, setQuery] = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (price.min !== MIN_PRICE || price.max !== MAX_PRICE) {
      query.set(FiltersQueryNames.Price, convertToQuery([price.min, price.max]));
    } else {
      query.delete(FiltersQueryNames.Price);
    }
    setQuery(query);
  }, [price]);

  const handleChangePrice = ([min, max]: number[]) => {
    setPriceValue([min, max]);
  };

  useEffect(() => {
    const updatedPrice = getMinMaxValues(filteredItems, 'price');
    const [min, max] = priceValue;
    if (updatedPrice.min !== min || updatedPrice.max !== max) {
      setPriceValue([updatedPrice.min, updatedPrice.max]);
    }
  }, [filteredItems]);

  const getPrice = () => {
    const [min, max] = priceValue;
    if (min === max) {
      return currencyFormatter.format(min);
    }
    return `From - ${currencyFormatter.format(min)} To - ${currencyFormatter.format(max)}`;
  };
  return (
    <StyledWrapper>
      <FilterHeader>
        <Typography>Price:</Typography>
        <Typography>{getPrice()}</Typography>
      </FilterHeader>
      <Slider
        getAriaLabel={() => 'Price'}
        value={priceValue}
        onChange={(_, newValue) => {
          handleChangePrice(newValue as number[]);
        }}
        onChangeCommitted={(_, newValues) => {
          const [min, max] = newValues as number[];
          dispatch(changePrice({ min, max }));
          dispatch(applyFilters());
        }}
        valueLabelDisplay="auto"
        min={10}
        max={1749}
      />
    </StyledWrapper>
  );
};

export default FilterByPrice;
