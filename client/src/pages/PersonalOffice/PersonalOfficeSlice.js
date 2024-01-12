import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from '../../services/OrderService';

const initialState = {
  status: 'idle',
  userOrders: [],
  userData: {},
  order:[],
};

export const fetchUserGetAll = createAsyncThunk(
  'order/fetchUserGetAll',
  async (id, { rejectWithValue }) => {
    try {
      const response = await OrderService.userGetAll(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserGetOne=createAsyncThunk(
  'order/fetchUserGetOne', 
  async (id, {rejectWithValue})=>{
    try {
      const response = await OrderService.userGetOne(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const PersonalOfficeSlice = createSlice({
  name: 'userOffice',
  initialState,
  extraReducers(builder) {
    builder

      .addCase(fetchUserGetAll.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserGetAll.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        state.userOrders = payload;
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
        // state.status = 'success';
        // state.userOrders = payload;
      })
      .addCase(fetchUserGetOne.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload);
      });
  },
});

export default PersonalOfficeSlice.reducer;
