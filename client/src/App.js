import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './hoc/Layuot/MainLayout';
import { ForgotPassword } from './components';
import { Admin, Auth, Basket, Checkout, Home, Prodact } from './pages';

import { fetchAutoLogin } from './pages/Auth/AuthSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) dispatch(fetchAutoLogin(token));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route path="checkout" element={<Checkout />} />
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
