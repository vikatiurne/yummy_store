import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { fetchUserGetAll, fetchUserGetOne } from '../PersonalOffice/PersonalOfficeSlice';
import DateServices from '../../utils/DateServices';

import styles from './PersonalOffice.module.css';
import { spinners } from '../../components/UI/Spinner/Spiner';

const PersonalOffice = () => {
  const isLogout = useSelector((state) => state.auth.isLogout);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.office.userOrders);
  const status = useSelector((state) => state.office.status);

  const dispatch = useDispatch();
  console.log(orders);

  useEffect(() => {
    dispatch(fetchUserGetAll(user.id));
  }, [dispatch, user]);

  const clickOrderHandler = (id) => {
    dispatch(fetchUserGetOne(id))
  };

  const render = !!orders.length ? (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Статус</th>
          <th>Дата</th>
        </tr>
      </thead>
      {orders.map((item) => (
        <tbody key={uuidv4()}>
          <tr className={styles.orderList} onClick={()=>clickOrderHandler(item.id)}>
            <td>
              №{item.createdAt.substring(0, 10)}_{item.id}
            </td>

            {item.status === 0 && <td>Нове</td>}
            {item.status === 1 && <td>В роботі</td>}
            {item.status === 2 && <td>Готове</td>}
            {item.status === 3 && <td>Виконане</td>}
            <td>
              <p>{DateServices.getDate(item.createdAt)}</p>
              <p>{DateServices.getUpdate(item.updatedAt)}</p>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
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
