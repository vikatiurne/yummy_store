import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';

const initialState = {
  category: [],
  categoryId: null,
  subcategory: [],
  subcategoryId: null,
  prodacts: [],
  count: null,
  limit: 8,
  page: 1,
  orderBy: '',
  sortBy: '',
  userId: null,
  ratings: [],
};

export const fetchGetCategory = createAsyncThunk(
  'home/fetchGetCategory',
  async () => await GetServices.getCategories()
);

export const fetchGetSubcategory = createAsyncThunk(
  'home/fetchGetSubcategory',
  async () => await GetServices.getSubcategories()
);

export const fetchGetAllProdact = createAsyncThunk(
  'home/fetchGetAllProdact',
  async ({ categoryId, subcategoryId, page, limit, orderBy, sortBy = 'ASC' }) =>
    await GetServices.getAllProdacts(
      categoryId,
      subcategoryId,
      page,
      limit,
      orderBy,
      sortBy
    )
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    selectedCategory: {
      reducer(state, { payload }) {
        state.categoryId = payload;
      },
    },
    selectedSubcategory: {
      reducer(state, { payload }) {
        state.subcategoryId = payload;
      },
    },
    selectedLimit: {
      reducer(state, { payload }) {
        state.limit = payload;
      },
    },
    selectedSortBy: {
      reducer(state, { payload }) {
        state.orderBy = payload.orderBy;
        state.sortBy = payload.sortBy;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetCategory.fulfilled, (state, { payload }) => {
        state.category = payload.data;
      })
      .addCase(fetchGetSubcategory.fulfilled, (state, { payload }) => {
        state.subcategory = payload.data;
      })
      .addCase(fetchGetAllProdact.fulfilled, (state, { payload }) => {
        // payload.data.rows.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        state.prodacts = payload.data.rows;
        state.count = payload.data.count;
      });
  },
});

export const {
  selectedCategory,
  selectedSubcategory,
  selectedLimit,
  selectedSortBy,
} = HomeSlice.actions;
export default HomeSlice.reducer;
