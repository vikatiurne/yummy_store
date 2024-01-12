import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { CheckoutForm, LoginForm } from '../../components';

import styles from './Checkout.module.css';

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
          { status !== 'loading' && <div
              onClick={enterDataHandler}
              className={
                activeEnterData || isAuth || isGoogleAuth ? styles.active : null
              }
            >
             <p>Ввести дані</p>
            </div>}
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
  ) : (
    <Navigate to="../order" />
  );
};

export default Checkout;
