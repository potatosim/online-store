import { MAX_STOCK, MIN_STOCK, applyFilters, changeStock } from 'handlers/filtersSlice';
import { Slider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect, useState } from 'react';

import FilterHeader from 'components/FilterHeader';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { convertToQuery } from 'helpers/queryHelpers';
import { getMinMaxValues } from 'handlers/getMinMaxValues';
import { getSliderWrapper } from 'helpers/getSliderWrapper';
import { useSearchParams } from 'react-router-dom';

const StyledWrapper = getSliderWrapper('stock');

const FilterByStock = () => {
  const [stockValue, setStockValue] = useState<number[]>([MIN_STOCK, MAX_STOCK]);
  const { filteredItems } = useAppSelector((state) => state.filters);
  const { stock } = useAppSelector((state) => state.filters.selectedFilters);
  const [query, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (stock.min !== MIN_STOCK || stock.max !== MAX_STOCK) {
      query.set(FiltersQueryNames.Stock, convertToQuery([stock.min, stock.max]));
    } else {
      query.delete(FiltersQueryNames.Stock);
    }
    setQuery(query);
  }, [stock]);

  const handleChangeStock = ([min, max]: number[]) => {
    setStockValue([min, max]);
  };

  useEffect(() => {
    const updatedStock = getMinMaxValues(filteredItems, 'stock');
    const [min, max] = stockValue;
    if (updatedStock.min !== min || updatedStock.max !== max) {
      setStockValue([updatedStock.min, updatedStock.max]);
    }
  }, [filteredItems]);

  const getStock = () => {
    const [min, max] = stockValue;
    if ([min, max].some((item) => item === Infinity || item === -Infinity)) {
      return 'Not Found';
    }
    if (min === max) {
      return min;
    }
    return `From - ${min} To - ${max}`;
  };

  return (
    <StyledWrapper>
      <FilterHeader>
        <Typography>Stock:</Typography>
        <Typography>{getStock()}</Typography>
      </FilterHeader>
      <Slider
        getAriaLabel={() => 'Stock'}
        value={stockValue}
        onChange={(_, newValue) => {
          handleChangeStock(newValue as number[]);
        }}
        onChangeCommitted={(_, newValues) => {
          const [min, max] = newValues as number[];
          dispatch(changeStock({ min, max }));
          dispatch(applyFilters());
        }}
        valueLabelDisplay="auto"
        min={2}
        max={150}
      />
    </StyledWrapper>
  );
};

export default FilterByStock;
