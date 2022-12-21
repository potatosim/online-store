import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer, { CartState } from 'handlers/cartSlice';

export interface ReduxState {
  cart: CartState;
}

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = configureStore<ReduxState>({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
