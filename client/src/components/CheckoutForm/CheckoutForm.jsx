import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGuestCreateOrder } from '../../pages/Checkout/CheckoutSlice';
import { resetBasket } from '../../pages/Basket/BasketSlice';

import { spinners } from '../UI/Spinner/Spiner';

import styles from './CheckoutForm.module.css';

const CheckoutForm = () => {
  const [isDelivery, setIsDelivery] = useState(false);

  const order = useSelector((state) => state.basket.order);

  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const status = useSelector((state) => state.order.status);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name,
      email,
    },
  });

  const handleDelivery = (e) => {
    e.target.value === 'Доставка' ? setIsDelivery(true) : setIsDelivery(false);
  };

  const onSubmit = (data) => {
    let address;
    !data.address ? (address = data.delivery) : (address = data.address);
    const inputData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address,
      comment: data.comment ?? null,
      items: order,
      userId: user.id ?? null,
    };

    dispatch(fetchGuestCreateOrder(inputData));
    dispatch(resetBasket());
    setIsDelivery(false);
    reset();
  };

  return status !== 'loading' ? (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formFields}>
        <input
          className={!!errors.name ? styles.redBorder : null}
          type="text"
          placeholder="Ім'я"
          {...register('name', {
            required: true,
            onChange: (e) => setName(e.target.value),
            minLength: {
              value: 2,
              message: "Ім'я має містити мінімум 2 символи",
            },
          })}
          autoComplete="on"
        />
        <div className={styles.errorMessage}>
          {errors?.name && <p>{errors?.name?.message}</p>}
        </div>

        <input
          className={!!errors.phone ? styles.redBorder : null}
          type="tel"
          placeholder="+380(__)___-__-__"
          inputMode="numeric"
          {...register('phone', {
            required: true,
            pattern: {
              value: /^(8|\+38)?[-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
              message: 'Некоректний номер телефону',
            },
          })}
          autoComplete="on"
        />
        <div className={styles.errorMessage}>
          {errors?.phone && <p>{errors?.phone?.message}</p>}
        </div>

        <input
          className={!!errors.email ? styles.redBorder : null}
          type="text"
          placeholder="E-mail"
          {...register('email', {
            required: true,
            onChange: (e) => setEmail(e.target.value),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Некоректний email',
            },
          })}
          autoComplete="on"
        />
        <div className={styles.errorMessage}>
          {errors?.email && <p>{errors?.email?.message}</p>}
        </div>

        <div
          className={
            !!errors.delivery ? styles.redBorder : styles.deliveryBlock
          }
        >
          <p>Адреса доставки</p>
          <div className={styles.radio}>
            <input
              {...register('delivery', {
                required: true,
              })}
              type="radio"
              id="choice1"
              value="Самовивіз"
            />
            <label htmlFor="choice1">Самовивіз</label>
          </div>
          <div className={styles.radio}>
            <input
              {...register('delivery', {
                required: true,
                onChange: (e) => handleDelivery(e),
              })}
              type="radio"
              id="choice2"
              value="Доставка"
            />
            <label htmlFor="choice2">Доставка по м.Харків</label>
          </div>
          {isDelivery && (
            <>
              <input
                className={!!errors.address ? styles.redBorder : null}
                type="text"
                placeholder="Адреса"
                {...register('address', {
                  required: true,
                  minLength: {
                    value: 5,
                    message: 'Адреса має містити мінімум 5 символів',
                  },
                })}
                autoComplete="on"
              />
              <div className={styles.errorMessage}>
                {errors?.address && <p>{errors?.address?.message}</p>}
              </div>
            </>
          )}
        </div>
        <div className={styles.errorMessage}>
          {errors?.delivery && <p>Оберіть варіант доставки замовлення</p>}
        </div>
        <textarea
          placeholder="Коментарій до замовлення"
          className={styles.comment}
          {...register('comment')}
        />
      </div>
      <button className={styles.success}>Відправити</button>
    </form>
  ) : (
    spinners.threeDots()
  );
};

export default CheckoutForm;
