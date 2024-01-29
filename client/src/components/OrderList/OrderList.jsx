import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import {
  fetchUserGetOne,
  hideDetail,
} from '../../pages/PersonalOffice/PersonalOfficeSlice';
import DateServices from '../../utils/DateServices';

import PaginationOrder from '../../components/PaginationOrder/PaginationOrder';

import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

import styles from './OrderList.module.css';

const OrderList = () => {
  const orders = useSelector((state) => state.office.userOrders);
  const order = useSelector((state) => state.office.order);
  const isDetail = useSelector((state) => state.office.isDetail);

  const dispatch = useDispatch();

  const clickOrderHandler = (id) => {
    dispatch(fetchUserGetOne(id));
  };
  const hideDetailHandler = () => {
    dispatch(hideDetail());
  };

  const renderOrders = !!orders.length && (
    <div className={styles.orderContainer}>
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
            {isDetail && item.id === order.id && (
              <tr>
                <td colSpan="4">
                  <div className={styles.detail}>
                    <p>
                      {order.address === 'Самовивіз'
                        ? order.address
                        : `Доставка за адресою ${order.address}`}{' '}
                      {order.readinessfor}
                    </p>
                    <p>Загальна сума: {order.amount}грн</p>
                    {order.comment?<p>Коментарій: {order.comment}</p>:null}
                    {order.items.map((prodact) => (
                      <div key={uuidv4()} className={styles.detailItem}>
                        <p>{prodact.name}</p>
                        <p>-</p>
                        <p>{prodact.qty}</p>
                      </div>
                    ))}
                  <button onClick={hideDetailHandler} className={styles.hideDetail}>
                    <MdKeyboardDoubleArrowUp />
                    <p>приховати деталі</p>
                    <MdKeyboardDoubleArrowUp />
                  </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>

      <PaginationOrder />
    </div>
  );
  return renderOrders;
};

export default OrderList;
