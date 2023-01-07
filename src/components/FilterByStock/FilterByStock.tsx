import { Slider, Typography } from '@mui/material';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { changeStock, applyFilters } from 'handlers/filtersSlice';
import { getMinMaxValues } from 'handlers/getMinMaxValues';
import { getSliderWrapper } from 'helpers/getSliderWrapper';
import { convertToQuery } from 'helpers/queryHelpers';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MIN_STOCK = 2;
const MAX_STOCK = 150;

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

  return (
    <StyledWrapper>
      <Typography>Stock</Typography>
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
