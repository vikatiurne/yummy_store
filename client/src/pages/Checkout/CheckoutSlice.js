import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from '../../services/OrderService';

const initialState = {
  status: 'idle',
  order: [],
  comment: '',
  amount: null,
  numOrder: null,
  orderStatus: '',
  address: '',
  readinessFor: '',
};

export const fetchGuestCreateOrder = createAsyncThunk(
  'order/fetchGuestCreateOrder',
  async (data, { rejectWithValue }) => {
    try {
      const response = await OrderService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CheckoutSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder(state) {
      state.status = 'idle';
      state.order = [];
      state.comment = '';
      state.amount = null;
      state.numOrder = null;
      state.orderStatus = '';
      state.address = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGuestCreateOrder.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchGuestCreateOrder.fulfilled, (state, { payload }) => {
        console.log('Payload:', payload);
        state.status = 'success';
        state.order = payload.items;
        state.amount = payload.amount;
        state.comment = payload.comment;
        state.numOrder = payload.createdAt.substring(0, 10) + '_' + payload.id;
        state.address = payload.address;
        state.readinessFor = payload.readinessfor;
        state.orderStatus = 'замовлення оформлене';
      })
      .addCase(fetchGuestCreateOrder.rejected, (state, { payload }) => {
        state.status = 'error';
        // console.log(payload)
      });
  },
});

export const { resetOrder } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
