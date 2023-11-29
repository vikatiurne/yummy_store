import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';
import BasketServices from '../../services/BasketServices';

const initialState = {
  order: [],
  status: 'idle',
  err: null,
  totalPrice: 0,
  numberOrder: null,
};

export const fetchGetBasket = createAsyncThunk(
  'basket/fetchGetBasket',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await GetServices.getBasket(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAppendProdact = createAsyncThunk(
  'basket/fetchAppendProdact',
  async ({ prodactId, qty, userId }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.append(prodactId, qty, userId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncrement = createAsyncThunk(
  'basket/fetchIncrement',
  async ({ prodactId }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.increment(prodactId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDecrement = createAsyncThunk(
  'basket/fetchDecrement',
  async ({ prodactId, minOrder }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.decrement(prodactId, minOrder);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchRemoveProdact = createAsyncThunk(
  'basket/fetchRemoveProdact',
  async ({ prodactId }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.remove(prodactId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    getTotalPrice(state, { payload }) {
      state.totalPrice = payload;
    },
    resetBasket(state) {
      console.log('resetBasket')
      state.order = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetBasket.pending, (state) => {
        state.status = 'loading';
        state.err = null;
        state.numberOrder = null;
      })
      .addCase(fetchGetBasket.fulfilled, (state, { payload }) => {
        state.status = 'success';
        if (!!payload.prodacts) {
          payload.prodacts.sort((a, b) => (a.id > b.id ? 1 : -1));
          state.order = payload.prodacts;
        }
        state.numberOrder = payload.id;
      })
      .addCase(fetchGetBasket.rejected, (state, { payload }) => {
        state.status = 'error';
        if (payload && payload.length >= 0) state.err = payload.data.message;
      })
      .addCase(fetchAppendProdact.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchAppendProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        if (!!payload) {
        payload.sort((a, b) => (a.id > b.id ? 1 : -1));
        state.order = payload;
        }
      })
      .addCase(fetchAppendProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      })
      .addCase(fetchIncrement.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchIncrement.fulfilled, (state, { payload }) => {
        state.status = 'success';
        payload.sort((a, b) => (a.id > b.id ? 1 : -1));
        state.order = payload;
      })
      .addCase(fetchIncrement.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      })
      .addCase(fetchDecrement.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchDecrement.fulfilled, (state, { payload }) => {
        state.status = 'success';
        payload.sort((a, b) => (a.id > b.id ? 1 : -1));
        state.order = payload;
      })
      .addCase(fetchDecrement.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      })
      .addCase(fetchRemoveProdact.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchRemoveProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        payload.sort((a, b) => (a.id > b.id ? 1 : -1));
        state.order = payload;
      })
      .addCase(fetchRemoveProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      });
  },
});

export const { getTotalPrice, resetBasket } = BasketSlice.actions;

export default BasketSlice.reducer;
