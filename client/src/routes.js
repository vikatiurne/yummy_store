import { Basket, Admin } from '../../server/models/models';
import { Login, Registration } from './components';
import { Auth, Home, Prodact } from './pages';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODACT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utits/constant';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: PRODACT_ROUTE + '/id',
    Component: Prodact,
  },
];
