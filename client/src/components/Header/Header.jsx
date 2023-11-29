import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';

import logo from '../../assets/cake_logo.png';

import styles from './Header.module.css';
import Button from '../UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../pages/Auth/AuthSlice';
import { fetchGetBasket, getTotalPrice, resetBasket } from '../../pages/Basket/BasketSlice';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userName = useSelector((state) => state.auth.user.name);
  const role = useSelector((state) => state.auth.user.role);
  const price = useSelector((state) => state.basket.totalPrice);
  const orders = useSelector((state) => state.basket.order);
  const userId = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!!userId) dispatch(fetchGetBasket({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (orders) {
      const total = orders
        .map(
          (item) =>
            item.basket_prodact.qty * (item.price / parseInt(item.sizes[0]))
        )
        .reduce((acc, val) => acc + val, 0);
      dispatch(getTotalPrice(total));
    }
  }, [orders, dispatch]);

  const logoutHandler = () => {
    dispatch(fetchLogout());
    dispatch(resetBasket())
    navigate('/')
  };
console.log("isAuth:", isAuth)
  return (
    <div className={styles.logoWrapper}>
      <Button className={styles.basket}>
        {!isAuth ? (
          <>
            <Link to="auth">
              <p>Вхід</p>
            </Link>
            <span />
          </>
        ) : (
          <>
              <p onClick={logoutHandler}>Вихід</p>
            <span />
          </>
        )}
        {!isAuth ? (
          <IoPerson className={styles.basketIcon} onClick={()=>{}} />
        ) : (
          <>
            {role === 'ADMIN' ? (
              <p onClick={() => navigate('/admin')}>Адмін</p>
            ) : (
              <p>{userName}</p>
            )}
          </>
        )}
      </Button>

      <Link to="..">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.logoName}>
            <h1>Yummy</h1>
            <p>найсмачніщі солодощі в світі</p>
          </div>
        </div>
      </Link>
      <Link to="basket">
        <div className={styles.basket}>
          <p>{price} ₴</p>
          <span />
          <div className={styles.basketInfo}>
            <MdShoppingCart className={styles.basketIcon} />
            <p>{orders ? orders.length : 0}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
