import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CreateServices from '../../services/CreateServices';

const initialState = {
  status: 'idle',
  error: null,
  category: '',
  subcategory: '',
  prodact: [],
};

export const fetchCreateCategory = createAsyncThunk(
  'admin/fetchCreateCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      return await CreateServices.createCategory(name);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateSubcategory = createAsyncThunk(
  'admin/fetchCreateSubcategory',
  async ({ name, categoryName }, { rejectWithValue }) => {
    try {
      return await CreateServices.createSubcategory(name, categoryName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateProdact = createAsyncThunk(
  'admin/fetchCreateProdact',
  async (formData, { rejectWithValue }) => {
    try {
      return await CreateServices.createProdact(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCreateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateCategory.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null;
        state.category = payload;
        // state.category.push(payload);
      })
      .addCase(fetchCreateCategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchCreateSubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateSubcategory.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null;
        state.subcategory = payload;
        // state.subcategory.push(payload);
      })
      .addCase(fetchCreateSubcategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchCreateProdact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null;
        state.prodact.push(payload);
      })
      .addCase(fetchCreateProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      });
  },
});

export default AdminSlice.reducer;
