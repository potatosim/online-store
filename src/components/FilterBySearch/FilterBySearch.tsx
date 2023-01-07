import { TextField } from '@mui/material';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import { changeSearchValue, applyFilters } from 'handlers/filtersSlice';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterBySearch = () => {
  const { searchValue } = useAppSelector((state) => state.filters.selectedFilters);
  const [query, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchValue) {
      query.set(FiltersQueryNames.Search, searchValue);
    } else {
      query.delete(FiltersQueryNames.Search);
    }
    setQuery(query);
  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.target.value));
    dispatch(applyFilters());
  };

  return (
    <TextField
      label="Search"
      value={searchValue}
      onChange={handleChange}
      sx={{ gridArea: 'search' }}
    />
  );
};

export default FilterBySearch;
