import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchUserGetAll,
  fetchUserGetOne,
} from '../PersonalOffice/PersonalOfficeSlice';
import DateServices from '../../utils/DateServices';

import styles from './PersonalOffice.module.css';
import { spinners } from '../../components/UI/Spinner/Spiner';
import PaginationOrder from '../../components/PaginationOrder/PaginationOrder';

const PersonalOffice = () => {
  const isLogout = useSelector((state) => state.auth.isLogout);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.office.userOrders);
  const status = useSelector((state) => state.office.status);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchUserGetAll({ id: user.id, page, limit }));
  }, [dispatch, user, page, limit]);

  const clickOrderHandler = (id) => {
    dispatch(fetchUserGetOne(id));
  };

  const render =
     !!orders.length ? (
      <>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>№ замовлення</th>
              <th>Статус</th>
              <th>Дата</th>
            </tr>
          </thead>
          {orders.map((item, i) => (
            <tbody key={uuidv4()}>
              <tr
                className={styles.orderList}
                onClick={() => clickOrderHandler(item.id)}
              >
                <td>{i + 1}</td>
                <td>
                  №{item.createdAt.substring(0, 10)}_{item.id}
                </td>

                {item.status === 0 && (
                  <td
                    className={`${styles.orderStatusNew} ${styles.orderStatus}`}
                  >
                    <p>Нове</p>
                  </td>
                )}
                {item.status === 1 && (
                  <td
                    className={`${styles.orderStatusWork} ${styles.orderStatus}`}
                  >
                    <p>В роботі</p>
                  </td>
                )}
                {item.status === 2 && (
                  <td
                    className={`${styles.orderStatusReady} ${styles.orderStatus}`}
                  >
                    <p>Готове</p>
                  </td>
                )}
                {item.status === 3 && (
                  <td
                    className={`${styles.orderStatusDone} ${styles.orderStatus}`}
                  >
                    <p>Виконане</p>
                  </td>
                )}
                <td>
                  <p>{DateServices.getDate(item.createdAt)}</p>
                  {item.status !== 0 && (
                    <p className={styles.updateText}>
                      {DateServices.getUpdate(item.updatedAt)}
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <PaginationOrder />
      </>
    ) : (
      <p>empty</p>
    );

  return status !== 'success' ? (
    spinners.threeDots()
  ) : !isLogout ? (
    render
  ) : (
    <Navigate to="/" />
  );
};

export default PersonalOffice;
