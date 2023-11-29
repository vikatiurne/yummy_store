import { useState } from 'react';
import { CheckoutForm } from '../../components';
import styles from './Checkout.module.css';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const [activeEnterData, setActiveEnterData] = useState(true);
  const [activeLogin, setLogin] = useState(false);

  const numOfOrder = useSelector(state=>state.basket.numberOrder)

  const enterDataHandler = () => {
    setActiveEnterData(true);
    setLogin(false)
  };

  const loginHandler = ()=>{
    setActiveEnterData(false);
    setLogin(true)
  }

  return (
    <div>
      <h2>Замовлення №{numOfOrder}</h2>
      <div>
        <main>
          <div className={styles.toggleSwitch}>
            <div onClick={enterDataHandler} className={activeEnterData?styles.active:null}>
              <p>Ввести дані</p>
            </div>
            <div onClick={loginHandler} className={activeLogin?styles.active:null}>
              <p>Увійти в акаунт</p>
            </div>
          </div>
          <CheckoutForm />
        </main>
        <aside></aside>
      </div>
    </div>
  );
};

export default Checkout;
