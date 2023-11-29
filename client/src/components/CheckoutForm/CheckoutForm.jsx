import { useForm } from 'react-hook-form';

import styles from './CheckoutForm.module.css';

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Ім'я"
        {...register('name', {
          required: 'Поле має бути заповненим',
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
        type="text"
        placeholder="Прізвище"
        {...register('lastName', {
          required: 'Поле має бути заповненим',
          minLength: {
            value: 3,
            message: 'Прізвище має містити мінімум 3 символи',
          },
        })}
        autoComplete="on"
      />
      <div className={styles.errorMessage}>
        {errors?.lastName && <p>{errors?.lastName?.message}</p>}
      </div>

      <input
        type="tel"
        placeholder="+380(__)___-__-__"
        inputMode="numeric"
        {...register('phone', {
          required: 'Поле має бути заповненим',
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
        type="text"
        placeholder="E-mail"
        {...register('email', {
          required: 'Поле має бути заповненим',
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

      <button>submit</button>
    </form>
  );
};

export default CheckoutForm;
