import { applyFilters, changeCategories } from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect, useMemo } from 'react';

import Filter from 'components/Filter/Filter';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { MenuItem } from '@mui/material';
import categoriesData from 'data/categories';
import { convertToQuery } from 'helpers/queryHelpers';
import { getFieldCount } from 'handlers/getFieldCount';
import { useSearchParams } from 'react-router-dom';

import styled from '@emotion/styled';

const StyledWrapper = styled(Filter)(() => ({
  gridArea: 'category',
}));

const FilterByCategory = () => {
  const { categories } = useAppSelector((state) => state.filters.selectedFilters);
  const { filteredItems } = useAppSelector((state) => state.filters);
  const [query, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.length) {
      query.set(FiltersQueryNames.Category, convertToQuery(categories));
    } else {
      query.delete(FiltersQueryNames.Category);
    }
    setQuery(query);
  }, [categories]);

  const currentCategories = useMemo(() => {
    return getFieldCount(filteredItems, 'category');
  }, [filteredItems]);

  const handleChangeCategory = (category: string) => {
    dispatch(changeCategories({ category }));
    dispatch(applyFilters());
  };

  return (
    <StyledWrapper label="Category" value={categories}>
      {categoriesData.map(({ name, totalCount }) => (
        <MenuItem onClick={() => handleChangeCategory(name)} key={name} value={name}>{`${name} ${
          currentCategories[name] || 0
        }/${totalCount}`}</MenuItem>
      ))}
    </StyledWrapper>
  );
};

export default FilterByCategory;
