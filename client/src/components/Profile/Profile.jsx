import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { fetchLogout, fetchUpdateUser } from '../../pages/Auth/AuthSlice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);

  const isChanged =
    user.name !== name ||
    user.email !== email ||
    (user.phone !== phone && phone !== '') ||
    (user.address !== address && address !== '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name,
      phone,
      email,
      address,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(fetchUpdateUser({ id: user.id, data }));
  };

  const logoutHandler = () => {
    dispatch(fetchLogout());
  };

  const renderProfile = (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formFields}>
        <div>
          <label htmlFor="name">Ім'я </label>
          <input
            type="text"
            name="name"
            className={!!errors.name ? styles.redBorder : null}
            {...register('name', {
              required: true,
              onChange: (e) => setName(e.target.value),
              minLength: {
                value: 2,
              },
            })}
          />
        </div>

        <div>
          <label htmlFor="phone">Телефон </label>
          <input
            className={!!errors.phone ? styles.redBorder : null}
            type="phone"
            name="phone"
            {...register('phone', {
              onChange: (e) => setPhone(e.target.value),
              pattern: {
                value: /^(8|\+38)?[-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
              },
            })}
          />
        </div>

        <div>
          <label htmlFor="email">Пошта </label>
          <input
            type="text"
            name="email"
            className={!!errors.email ? styles.redBorder : null}
            {...register('email', {
              required: true,
              onChange: (e) => setEmail(e.target.value),
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            })}
          />
        </div>

        <div>
          <label htmlFor="address">Адреса </label>
          <div className={styles.formControl}>
            <textarea
              type="text"
              name="address"
              className={!!errors.address ? styles.redBorder : null}
              {...register('address', {
                onChange: (e) => setAddress(e.target.value),
              })}
            />

            {isChanged && <button>Збергти профіль</button>}
            <p onClick={logoutHandler}>Вийти</p>
          </div>
        </div>
      </div>
    </form>
  );

  return renderProfile;
};

export default Profile;
