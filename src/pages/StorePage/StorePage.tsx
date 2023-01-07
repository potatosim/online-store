import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import Filter from 'components/Filter';
import categoriesData from 'data/categories';
import brandsData from 'data/brands';
import {
  addBrandsFromQuery,
  addCategoriesFromQuery,
  applyFilters,
  changeBrands,
  changeCategories,
  changePrice,
  changeSearchValue,
  changeSort,
  changeStock,
  resetFilters,
} from 'handlers/filtersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { getFieldCount } from 'handlers/getFieldCount';
import { getMinMaxValues } from 'handlers/getMinMaxValues';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useQueryParam from 'hooks/useQueryParam';
import { FiltersQueryNames } from 'enums/FiltersQueryNames';
import StoreCard from './StoreCard';
import { SortBy, SortDirection } from 'enums/SortingStrategy';
import IconButton from '@mui/material/IconButton';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { convertToQuery, parseQuery } from 'helpers/queryHelpers';
import { RoutePaths } from 'enums/RoutePaths';

const MIN_PRICE = 10;
const MAX_PRICE = 1749;
const MIN_STOCK = 2;
const MAX_STOCK = 150;

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
    <Filter label="Category" value={categories}>
      {categoriesData.map(({ name, totalCount }) => (
        <MenuItem onClick={() => handleChangeCategory(name)} key={name} value={name}>{`${name} ${
          currentCategories[name] || 0
        }/${totalCount}`}</MenuItem>
      ))}
    </Filter>
  );
};

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
    <Filter label="Brand" value={brands}>
      {brandsData.map(({ name, totalCount }) => (
        <MenuItem onClick={() => handleChangeBrand(name)} key={name} value={name}>{`${name} ${
          currentBrands[name] || 0
        }/${totalCount}`}</MenuItem>
      ))}
    </Filter>
  );
};

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

  return (
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
  );
};

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
  );
};

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

  return <TextField label="Search" value={searchValue} onChange={handleChange} />;
};

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
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
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
    </div>
  );
};

const StorePage = () => {
  const { filteredItems } = useAppSelector((state) => state.filters);
  // eslint-disable-next-line
  const [_, setQuery] = useSearchParams();
  const dispatch = useAppDispatch();
  const categoryQuery = useQueryParam(FiltersQueryNames.Category);
  const brandQuery = useQueryParam(FiltersQueryNames.Brand);
  const priceQuery = useQueryParam(FiltersQueryNames.Price);
  const stockQuery = useQueryParam(FiltersQueryNames.Stock);
  const searchQuery = useQueryParam(FiltersQueryNames.Search);
  const sortDirectionQuery = useQueryParam(FiltersQueryNames.SortDirection);
  const sortFieldQuery = useQueryParam(FiltersQueryNames.SortField);

  const navigate = useNavigate();

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Filters</Button>
      <Drawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', width: '100%'  }}
      >
        <div
          style={{
            flex: '1 1 auto',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '15px',
          }}
        >
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
          >
            Reset Filters
          </Button>
        </div>
      </Drawer>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          margin: '20px 10px 50px',
        }}
      >
        {filteredItems.map((item) => (
          // <StoreCard storeCardItem={item} key={item.thumbnail}></StoreCard>
          <StoreCard
            storeCardItem={item}
            key={item.thumbnail}
            onClick={() => navigate(`/${RoutePaths.ProductPage}/${item.id}`)}
          >
            {item.title}
          </StoreCard>
        ))}
      </div>
    </>
  );
};

export default StorePage;
