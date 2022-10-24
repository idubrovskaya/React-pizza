import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { SearchPizzaParams, Pizza, PizzaSliceState, Status } from './types';


export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { category, sortBy, search, currentPage, order } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://63332db0433198e79dc0e828.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}${search}&order=${order}`
    );
    return data as Pizza[];
  }
);

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
