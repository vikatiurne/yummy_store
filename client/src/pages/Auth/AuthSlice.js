import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthServices from '../../services/AuthServices';
import GetServices from '../../services/GetServices';

const initialState = {
  user: {},
  isAuth: false,
  isLogout: false,
  status: 'idle',
  error: null,
  msg: null,
  redirectUrl: '',
  // isGoogleAuth: false,
  pathname: '',
  prevLocation: '/',
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await AuthServices.login(email, password);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAutoLogin = createAsyncThunk(
  'auth/fetchAutoLogin',
  async () => await AuthServices.autoLogin()
);

export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      return await AuthServices.registration(email, password, name);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return await AuthServices.forgotPassword(email);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'auth/fetchResetPassword',
  async ({ newPass, resetLink }, { rejectWithValue }) => {
    try {
      return await AuthServices.resetPassword(newPass, resetLink);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetGoogleUser = createAsyncThunk(
  'auth/fetchGetGoogleUser',
  async () => await AuthServices.getGoogleUser()
);

export const fetchGetUser = createAsyncThunk(
  'auth/fetchGetUser',
  async () => await GetServices.getUser()
);

export const fetchGetRedirectUrl = createAsyncThunk(
  'auth/fetchGetRedirectUrl',
  async () => await AuthServices.getGoogleRedirectUrl()
);

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  return await AuthServices.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLocation(state, { payload }) {
      state.pathname = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isLogout=false
      })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        state.status = 'success';
        if (!!payload.data.user) {
          state.isAuth = true;
          state.user = payload.data.user;
          localStorage.setItem('token', payload.data.accessToken);
        } else {
          state.error = payload.data.message;
        }
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, { payload }) => {
        state.status = 'success';
        if (!!payload.data.user) {
          state.isAuth = true;
          state.user = payload.data.user;
          localStorage.setItem('token', payload.data.accessToken);
        } else {
          if (!!payload.data.errors.length) {
            let problems = [];

            for (let i = 0; i < payload.data.errors.length; i++) {
              let nameProblem = payload.data.errors[i].path;
              if (nameProblem === 'password') nameProblem = 'паролю';
              problems.push(nameProblem);
            }
            let msg;
            problems.length > 1
              ? (msg = `${problems[0]} та ${problems[1]}`)
              : (msg = `${problems[0]}`);
            state.error = `${payload.data.message}. Перевірте коректність вашого ${msg}.`;
          } else {
            state.error = payload.data.message;
          }
        }
      })
      .addCase(fetchRegistration.rejected, (state, { payload }) => {
        state.status = 'error';
        let problem;
        problem = payload.errors[0].path;
        if (problem === 'password') problem = 'паролю';
        state.error = `${payload.message}. Перевірте коректність вашого ${problem}.`;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        localStorage.removeItem('token');
        localStorage.removeItem('location');
        state.status = 'success';
        state.error = null;
        state.isAuth = false;
        // state.isGoogleAuth = false;
        state.isLogout = true;
        state.user = {};
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAutoLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAutoLogin.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.status = 'success';
        state.user = payload.data.user;
        state.error = payload.message;
        state.isAuth = true;
        // state.isGoogleAuth = true;
      })
      .addCase(fetchAutoLogin.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchForgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, { payload }) => {
        state.error = payload.data.message;
      })
      .addCase(fetchForgotPassword.rejected, (state, { payload }) => {
        state.status = 'error';
        state.msg = payload.message;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, { payload }) => {
        state.msg = payload.data.message;
      })
      .addCase(fetchResetPassword.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchGetGoogleUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGetGoogleUser.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        localStorage.setItem('token', payload.data.accessToken);
        // state.isGoogleAuth = true;
        state.isAuth = true;
        state.prevLocation = localStorage.getItem('location');
        localStorage.removeItem('location');
      })
      .addCase(fetchGetGoogleUser.rejected, (state, { payload }) => {
        console.log(payload);
        state.status = 'error';
        // state.error = payload.message
      })
      .addCase(fetchGetRedirectUrl.pending, (state) => {
        localStorage.removeItem('location');
      })
      .addCase(fetchGetRedirectUrl.fulfilled, (state, { payload }) => {
        state.redirectUrl = payload.data;
        localStorage.setItem('location', state.pathname);
      });
  },
});

export const { getLocation } = authSlice.actions;
export default authSlice.reducer;
