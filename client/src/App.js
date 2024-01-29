import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './hoc/Layuot/MainLayout';
import { ForgotPassword, Order } from './components';
import {
  Admin,
  Auth,
  Basket,
  Checkout,
  Home,
  PersonalOffice,
  Prodact,
} from './pages';

import { fetchAutoLogin } from './pages/Auth/AuthSlice';
import { fetchGetBasket } from './pages/Basket/BasketSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) dispatch(fetchAutoLogin());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
 
  useEffect(() => {
    !!user.id
      ? dispatch(fetchGetBasket(user.id))
      : dispatch(fetchGetBasket({ userId: null }));
  }, [dispatch, user.id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<Order />} />
          <Route path="office" element={<PersonalOffice />} />
          <Route path="prodact/:id" element={<Prodact />} />
          <Route path="auth" element={<Auth />} />
          <Route path="resetpassword/:link" element={<ForgotPassword />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
