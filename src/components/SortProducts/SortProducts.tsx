import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { SortBy, SortDirection } from 'enums/SortingStrategy';
import { applyFilters, changeSort } from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';

import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledWrapper = styled('div')`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  grid-area: sort;
`;

const SortProducts = () => {
  const { direction, field } = useAppSelector((state) => state.filters.selectedSort);
  const [query, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (direction && field) {
      query.set(FiltersQueryNames.SortDirection, direction);
      query.set(FiltersQueryNames.SortField, field);
    } else {
      query.delete(FiltersQueryNames.SortDirection);
      query.delete(FiltersQueryNames.SortField);
    }
    setQuery(query);
  }, [direction, field]);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSort({ field: e.target.value as SortBy, direction }));
    dispatch(applyFilters());
  };

  const handleChangeDirection = () => {
    dispatch(
      changeSort({
        direction: direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC,
        field,
      }),
    );
    dispatch(applyFilters());
  };

  const renderDirectionIcon = () => {
    if (direction === SortDirection.ASC) {
      return <NorthEastIcon />;
    }

    return <SouthEastIcon />;
  };

  return (
    <StyledWrapper>
      <FormControl fullWidth>
        <InputLabel>{field || 'Sort'}</InputLabel>
        <Select
          input={
            <OutlinedInput
              label={field || 'Sort'}
              value={field || ''}
              onChange={handleChangeField}
            />
          }
        >
          <MenuItem value={SortBy.Price}>{SortBy.Price}</MenuItem>
          <MenuItem value={SortBy.Stock}>{SortBy.Stock}</MenuItem>
          <MenuItem value={SortBy.Rating}>{SortBy.Rating}</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleChangeDirection}>{renderDirectionIcon()}</IconButton>
    </StyledWrapper>
  );
};

export default SortProducts;
