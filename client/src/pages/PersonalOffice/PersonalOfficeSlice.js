import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from '../../services/OrderService';

const initialState = {
  status: 'idle',
  userOrders: [],
  userData: {},
  order: [],
  count: null,
  limit: 8,
  page: 1,
  isDetail: false,
};

export const fetchUserGetAll = createAsyncThunk(
  'order/fetchUserGetAll',
  async ({ id, page, limit }, { rejectWithValue }) => {
    try {
      const response = await OrderService.userGetAll(id, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserGetOne = createAsyncThunk(
  'order/fetchUserGetOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await OrderService.userGetOne(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const PersonalOfficeSlice = createSlice({
  name: 'userOffice',
  initialState,
  reducers: {
    selectedLimit: {
      reducer(state, { payload }) {
        state.limit = payload;
      },
    },
    selectedPage: {
      reducer(state, { payload }) {
        state.page = payload;
      },
    },
    hideDetail: {
      reducer(state) {
        state.isDetail = false;
      },
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchUserGetAll.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserGetAll.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        state.userOrders = payload.rows;
        state.count = payload.count;
      })
      .addCase(fetchUserGetAll.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload);
      })
      .addCase(fetchUserGetOne.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserGetOne.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        state.isDetail = true;
        state.order = payload;
      })
      .addCase(fetchUserGetOne.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload);
      });
  },
});

export const { selectedLimit, selectedPage,hideDetail } = PersonalOfficeSlice.actions;
export default PersonalOfficeSlice.reducer;
