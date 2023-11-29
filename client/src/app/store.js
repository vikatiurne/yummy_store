import { configureStore } from '@reduxjs/toolkit';
import {
  adminReducer,
  authReducer,
  homeReducer,
  prodactReducer,
  basketReducer,
} from '../pages';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer,
    prodact: prodactReducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
