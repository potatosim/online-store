import { sortProductsBy } from './../helpers/sortProductsBy';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from 'data/data';
import { SortBy, SortDirection } from 'enums/SortingStrategy';
import { ProductItem } from 'types/ProductItem';

export interface FiltersState {
  selectedFilters: {
    categories: string[];
    brands: string[];
    price: {
      min: number;
      max: number;
    };
    stock: {
      min: number;
      max: number;
    };
    searchValue: string;
  };
  selectedSort: {
    field: SortBy | null;
    direction: SortDirection;
  };
  filteredItems: ProductItem[];
  data: ProductItem[];
}

const initialState: FiltersState = {
  selectedFilters: {
    categories: [],
    brands: [],
    price: {
      min: 10,
      max: 1749,
    },
    stock: {
      min: 2,
      max: 150,
    },
    searchValue: '',
  },
  selectedSort: {
    direction: SortDirection.ASC,
    field: null,
  },
  filteredItems: data.products,
  data: data.products,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCategoriesFromQuery({ selectedFilters }, { payload }: PayloadAction<string[]>) {
      selectedFilters.categories = payload;
    },
    addBrandsFromQuery({ selectedFilters }, { payload }: PayloadAction<string[]>) {
      selectedFilters.brands = payload;
    },
    changeCategories({ selectedFilters }, { payload }: PayloadAction<{ category: string }>) {
      const isCategorySelected = selectedFilters.categories.some(
        (category) => category === payload.category,
      );
      if (isCategorySelected) {
        selectedFilters.categories = selectedFilters.categories.filter(
          (category) => category !== payload.category,
        );
      } else {
        selectedFilters.categories.push(payload.category);
      }
    },
    changeBrands({ selectedFilters }, { payload }: PayloadAction<{ brand: string }>) {
      const isCategorySelected = selectedFilters.brands.some((brand) => brand === payload.brand);
      if (isCategorySelected) {
        selectedFilters.brands = selectedFilters.brands.filter((brand) => brand !== payload.brand);
      } else {
        selectedFilters.brands.push(payload.brand);
      }
    },
    changePrice({ selectedFilters }, { payload }: PayloadAction<{ min: number; max: number }>) {
      selectedFilters.price.max = payload.max;
      selectedFilters.price.min = payload.min;
    },
    changeStock({ selectedFilters }, { payload }: PayloadAction<{ min: number; max: number }>) {
      selectedFilters.stock.max = payload.max;
      selectedFilters.stock.min = payload.min;
    },
    changeSearchValue({ selectedFilters }, { payload }: PayloadAction<string>) {
      selectedFilters.searchValue = payload;
    },
    changeSort(
      state,
      { payload }: PayloadAction<{ field: SortBy | null; direction: SortDirection }>,
    ) {
      state.selectedSort.direction = payload.direction;
      state.selectedSort.field = payload.field;
      state.data = sortProductsBy(
        state.data,
        state.selectedSort.field!,
        state.selectedSort.direction,
      );
    },
    applyFilters(state) {
      state.filteredItems = state.data.filter((productItem) =>
        [
          checkProductCategory,
          checkProductBrand,
          checkProductPrice,
          checkProductStock,
          checkProductBySearchField,
        ].every((filter) => filter(state.selectedFilters, productItem)),
      );
    },
    resetFilters() {
      return initialState;
    },
  },
});

const checkProductCategory = (filters: FiltersState['selectedFilters'], product: ProductItem) => {
  if (!filters.categories.length) {
    return true;
  }

  return filters.categories.includes(product.category.toLowerCase());
};

const checkProductBrand = (filters: FiltersState['selectedFilters'], product: ProductItem) => {
  if (!filters.brands.length) {
    return true;
  }

  return filters.brands.includes(product.brand.toLowerCase());
};

const checkProductPrice = (filters: FiltersState['selectedFilters'], product: ProductItem) => {
  return product.price >= filters.price.min && product.price <= filters.price.max;
};

const checkProductStock = (filters: FiltersState['selectedFilters'], product: ProductItem) => {
  return product.stock >= filters.stock.min && product.stock <= filters.stock.max;
};

const checkProductBySearchField = (
  filters: FiltersState['selectedFilters'],
  product: ProductItem,
) => {
  if (!filters.searchValue.length) {
    return true;
  }

  return Object.entries(product).some(([key, value]: [string, string]) => {
    if (key === 'id' || key === 'thumbnail' || key === 'images') {
      return false;
    }

    return !!value.toString().toLowerCase().match(filters.searchValue);
  });
};

export const {
  changeCategories,
  applyFilters,
  changeBrands,
  changeStock,
  changePrice,
  resetFilters,
  changeSearchValue,
  changeSort,
  addCategoriesFromQuery,
  addBrandsFromQuery,
} = filtersSlice.actions;

export default filtersSlice.reducer;
