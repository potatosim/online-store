import { MenuItem } from '@mui/material';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { changeBrands, applyFilters } from 'handlers/filtersSlice';
import { getFieldCount } from 'handlers/getFieldCount';
import { convertToQuery } from 'helpers/queryHelpers';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import brandsData from 'data/brands';
import Filter from 'components/Filter/Filter';
import styled from '@emotion/styled';

const StyledWrapper = styled(Filter)(() => ({
  gridArea: 'brand',
}));

const FilterByBrand = () => {
  const { brands } = useAppSelector((state) => state.filters.selectedFilters);
  const { filteredItems } = useAppSelector((state) => state.filters);
  const [query, setQuery] = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (brands.length) {
      query.set(FiltersQueryNames.Brand, convertToQuery(brands));
    } else {
      query.delete(FiltersQueryNames.Brand);
    }
    setQuery(query);
  }, [brands]);

  const currentBrands = useMemo(() => {
    return getFieldCount(filteredItems, 'brand');
  }, [filteredItems]);

  const handleChangeBrand = (brand: string) => {
    dispatch(changeBrands({ brand }));
    dispatch(applyFilters());
  };

  return (
    <StyledWrapper label="Brand" value={brands}>
      {brandsData.map(({ name, totalCount }) => (
        <MenuItem onClick={() => handleChangeBrand(name)} key={name} value={name}>{`${name} ${
          currentBrands[name] || 0
        }/${totalCount}`}</MenuItem>
      ))}
    </StyledWrapper>
  );
};

export default FilterByBrand;
