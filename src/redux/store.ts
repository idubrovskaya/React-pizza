import { configureStore } from '@reduxjs/toolkit';
import pizzasSlice from './slices/pizza/slice';
import { useDispatch } from 'react-redux';
import cartSlice from './slices/cart/slice';
import filterSlice from './slices/filter/slice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
