import { configureStore } from '@reduxjs/toolkit';
import {
  adminReducer,
  authReducer,
  homeReducer,
  prodactReducer,
  basketReducer,
  checkoutReducer,
  officeReducer,
} from '../pages';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer,
    prodact: prodactReducer,
    basket: basketReducer,
    order: checkoutReducer,
    office: officeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
