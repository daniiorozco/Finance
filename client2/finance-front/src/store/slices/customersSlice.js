// src/features/customersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios/apiManager';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await api.get('/clientes');
  console.log(response);
  return response.data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  //acciones adicionales basadas en el estado de las acciones asíncronas.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {  // Define cómo debe cambiar el estado cuando la acción fetchCustomers.pending está en curso
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {  //Define cómo debe cambiar el estado cuando la acción fetchCustomers.fulfilled se completa con éxito
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => { // Define cómo debe cambiar el estado cuando la acción fetchCustomers.rejected falla
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
