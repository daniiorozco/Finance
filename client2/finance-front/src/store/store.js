import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './slices/customersSlice';
import loansReducer from './slices/loansSlice';

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    loans: loansReducer,
  },
});