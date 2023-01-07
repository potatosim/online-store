import { Button, SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import React, { useState } from 'react';

import FilterByBrand from 'components/FilterByBrand';
import FilterByCategory from 'components/FilterByCategory';
import FilterByPrice from 'components/FilterByPrice';
import FilterBySearch from 'components/FilterBySearch';
import FilterByStock from 'components/FilterByStock';
import SortProducts from 'components/SortProducts';
import { resetFilters } from 'handlers/filtersSlice';
import styled from '@emotion/styled';
import { useAppDispatch } from 'hooks/reduxHooks';
import { useSearchParams } from 'react-router-dom';

const StyledDrawer = styled(SwipeableDrawer)<SwipeableDrawerProps>(() => ({
  '& .MuiDrawer-paper': {
    alignItems: 'center',
    padding: '2rem',
  },
}));

const FiltersWrapper = styled('div')`
  width: 100%;
  display: grid;
  grid-template-areas: 'category brand' 'price price' 'stock stock' 'search sort' 'reset-filters reset-filters';
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Filters = () => {
  // eslint-disable-next-line
  const [_, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <StyledDrawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
        transitionDuration={250}
      >
        <FiltersWrapper>
          <FilterByCategory />
          <FilterByBrand />
          <FilterByPrice />
          <FilterByStock />
          <FilterBySearch />
          <SortProducts />
          <Button
            onClick={() => {
              dispatch(resetFilters());
              setQuery(new URLSearchParams());
            }}
            sx={{ gridArea: 'reset-filters' }}
          >
            Reset Filters
          </Button>
        </FiltersWrapper>
      </StyledDrawer>
      <Button onClick={() => setIsOpen(true)}>Filters</Button>
    </>
  );
};

export default Filters;
