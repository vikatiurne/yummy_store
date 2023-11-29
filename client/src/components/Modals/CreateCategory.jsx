import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchCreateCategory } from '../../pages/Admin/AdminSlice';

import { Modal } from '../index';

import styles from './Modals.module.css';

const CreateCategory = ({ active, setActive }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const dispatch = useDispatch();

  const addCategoryHandler = (data) => {
    dispatch(fetchCreateCategory({ name: data.categoryName }));
    setActive();
    reset();
  };

  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modalTitle}>
        <p>Додати категорію</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(addCategoryHandler)}>
          <input
          className={!!errors.categoryName ? styles.redBorder : null}
            {...register('categoryName', {
              required: 'Поле має бути заповненим',
            })}
            placeholder="Назва категорії"
          />
          <div className={styles.errorMessage}>
            {errors?.categoryName && <p>{errors?.categoryName?.message}</p>}
          </div>
          <input type="submit" className={styles.add} value="Додати" />
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategory;
