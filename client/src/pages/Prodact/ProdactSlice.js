import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';
import CreateServices from '../../services/CreateServices';

const initialState = {
  status: 'idle',
  statusRate: 'idle',
  prodact: {},
  rating: 0,
  msg: null,
  size: [],
  category: '',
  subcategory: '',
};

export const fetchGetProdact = createAsyncThunk(
  'prodact/fetchGetProdact',
  async ({ id }) => await GetServices.getOneProdact(id)
);

export const fetchCreateRating = createAsyncThunk(
  'prodact/fetchCreateRating',
  async ({ rating, prodactId }) =>
    await CreateServices.createRating(rating, prodactId)
);

export const fetchCheckVote = createAsyncThunk(
  'prodact/fetchCheckVote',
  async ({ prodactId, userId }) =>
    await GetServices.checkVote(prodactId, userId)
);

export const fetchGetRating = createAsyncThunk(
  'prodact/fetchGetRating',
  async ({ prodactId }) => await GetServices.getRating(prodactId)
);

export const fetchGetCategoryById = createAsyncThunk(
  'prodact/fetchGetCategoryById',
  async ({ id }) => await GetServices.getCategory(id)
);
export const fetchGetSubcategoryById = createAsyncThunk(
  'prodact/fetchGetSubcategoryById',
  async ({ id }) => await GetServices.getSubcategory(id)
);

const ProdactSlice = createSlice({
  name: 'prodact',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchGetProdact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGetProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.prodact = payload.data;
        state.rating = payload.data.rating;
      })
      .addCase(fetchGetProdact.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchCreateRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateRating.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.rating = payload.data;
      })
      .addCase(fetchCreateRating.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchGetRating.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.rating = payload;
      })
      .addCase(fetchCheckVote.pending, (state, { payload }) => {
        state.statusRate = 'loading';
        state.msg = null;
      })
      .addCase(fetchCheckVote.fulfilled, (state, { payload }) => {
        state.statusRate = 'success';
        state.msg = payload.data?.message;
      })
      .addCase(fetchCheckVote.rejected, (state) => {
        state.statusRate = 'error';
      })
      .addCase(fetchGetCategoryById.fulfilled, (state, { payload }) => {
        state.category = payload.data;
      })
      .addCase(fetchGetSubcategoryById.fulfilled, (state, { payload }) => {
        state.subcategory = payload.data;
      })
  },
});

export default ProdactSlice.reducer;
