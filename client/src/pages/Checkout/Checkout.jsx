import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckoutForm, LoginForm, Order } from '../../components';

import styles from './Checkout.module.css';
import { Navigate } from 'react-router-dom';

const Checkout = () => {
  const [activeEnterData, setActiveEnterData] = useState(true);
  const [activeLogin, setLogin] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isGoogleAuth = useSelector((state) => state.auth.isGoogleAuth);
  const status = useSelector((state) => state.order.status);

  const enterDataHandler = () => {
    setActiveEnterData(true);
    setLogin(false);
  };

  const loginHandler = () => {
    setActiveEnterData(false);
    setLogin(true);
  };

  return status !== 'success' ? (
    <div>
      <h2>Оформлення замовлення</h2>
      <div>
        <main>
          <div className={styles.toggleSwitch}>
            <div
              onClick={enterDataHandler}
              className={
                activeEnterData || isAuth || isGoogleAuth ? styles.active : null
              }
            >
              <p>Ввести дані</p>
            </div>
            {!isAuth && !isGoogleAuth && (
              <div
                onClick={loginHandler}
                className={activeLogin ? styles.active : null}
              >
                <p>Увійти в акаунт</p>
              </div>
            )}
          </div>
          {activeLogin && <LoginForm />}
          {(activeEnterData || isAuth || isGoogleAuth) && <CheckoutForm />}
        </main>
        <aside></aside>
      </div>
    </div>
  ) : isAuth || isGoogleAuth ? (
    <Order />
  ) : (
    <Navigate to="/" />
  );
};

export default Checkout;
