import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer, { CartState } from 'handlers/cartSlice';
import filtersReducer, { FiltersState } from 'handlers/filtersSlice';

export interface ReduxState {
  cart: CartState;
  filters: FiltersState;
}

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filtersReducer,
});

const store = configureStore<ReduxState>({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
