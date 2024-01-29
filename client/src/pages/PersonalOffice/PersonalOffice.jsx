import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchUserGetAll } from '../PersonalOffice/PersonalOfficeSlice';

import { spinners } from '../../components/UI/Spinner/Spiner';

import orderImg from '../../assets/order.png';
import styles from './PersonalOffice.module.css';
import OrderList from '../../components/OrderList/OrderList';

const PersonalOffice = () => {
  const [activeBtn, setActiveBtn] = useState('order');

  const isLogout = useSelector((state) => state.auth.isLogout);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.office.status);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserGetAll({ id: user.id, page, limit }));
  }, [dispatch, user, page, limit]);

  const clickOrderBtnHandler = () => {
    setActiveBtn('order');
  };
  const clickProfileBtnHandler = () => {
    setActiveBtn('profile');
  };

  const renderProfile = <h1>Профіль</h1>;

  return (
    <div className={styles.officeWrapper}>
      <aside className={styles.officeBtn}>
        <p
          className={
            activeBtn !== 'order'
              ? `${styles.button} ${styles.bottomOrderBtn}`
              : `${styles.activeBtn} ${styles.topBtn}`
          }
          onClick={clickOrderBtnHandler}
        >
          Замовлення
        </p>
        <p
          className={
            activeBtn !== 'profile'
              ? `${styles.button} ${styles.bottomBtn}`
              : `${styles.activeBtn} ${styles.topProfileBtn}`
          }
          onClick={clickProfileBtnHandler}
        >
          Профіль
        </p>
      </aside>
      <div className={styles.officeMain}>
        {activeBtn === 'order' ? <h1>Замовлення</h1> : <h1>Профіль</h1>}
        <div className={styles.officeContainer}>
          {status !== 'success' ? (
            spinners.threeDots()
          ) : !isLogout ? (
            activeBtn === 'order' ? (
              <>
                <OrderList />
                <img src={orderImg} alt="order" />
              </>
            ) : (
              renderProfile
            )
          ) : (
            <Navigate to="/" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalOffice;
