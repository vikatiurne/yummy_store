import { configureStore } from '@reduxjs/toolkit';
import {
  adminReducer,
  authReducer,
  homeReducer,
  prodactReducer,
  basketReducer,
  checkoutReducer,
} from '../pages';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer,
    prodact: prodactReducer,
    basket: basketReducer,
    order: checkoutReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
