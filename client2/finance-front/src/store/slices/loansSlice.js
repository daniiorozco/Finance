// src/features/loansSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios/apiManager';

export const fetchLoans = createAsyncThunk('loans/fetchLoans', async () => {
  const response = await api.get('/prestamos');
  return response.data;
});

const loansSlice = createSlice({
  name: 'loans',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loansSlice.reducer;
