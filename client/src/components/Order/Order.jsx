import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import styles from './Order.module.css';

const Order = () => {
  const [detailsActive, setDetailsActive] = useState(false);

  const order = useSelector((state) => state.order.order);
  const numOrder = useSelector((state) => state.order.numOrder);
  const comment = useSelector((state) => state.order.comment);
  const amount = useSelector((state) => state.order.amount);
  const orderStatus = useSelector((state) => state.order.orderStatus);
  const address = useSelector((state) => state.order.address);

  const detailsHandler = () => setDetailsActive((prev) => !prev);

  const render = (
    <div>
      <p>Ваше замовлення {numOrder} оформлено</p>
      <p>Сума до сплати {amount}грн </p>
      <p>Доставка: {address}</p>
      <p>Статус: {orderStatus}</p>
      <div>
        <p onClick={detailsHandler}>Деталі замовлення</p>
        {detailsActive && (
          <>
            <table className={styles.table}>
              {order.map((item, i) => (
                <tbody key={uuidv4()}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}грн</td>
                    <td>{item.qty}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            {!!comment && <p>Коментарій: {comment}</p>}
          </>
        )}
      </div>
    </div>
  );
  return render;
};

export default Order;
