import { configureStore, combineReducers } from '@reduxjs/toolkit';

export interface ReduxState {}

const rootReducer = combineReducers({});

const store = configureStore<ReduxState>({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
