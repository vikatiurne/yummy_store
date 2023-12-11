import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';

import { fetchCreateCategory, isClickAdd } from '../../pages/Admin/AdminSlice';

import styles from './AddCategory.module.css';

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const dispatch = useDispatch();

  const addCategoryHandler = (data) => {
    dispatch(fetchCreateCategory({ name: data.categoryName }));
    dispatch(isClickAdd(false))
  };

  const cancelHandler = () => {
    dispatch(isClickAdd(false));
  };

  const render=(
    <form onSubmit={handleSubmit(addCategoryHandler)} className={styles.form}>
      <input
        className={!!errors.categoryName ? styles.redBorder : styles.editName}
        {...register('categoryName', {
          required: 'Поле має бути заповненим',
        })}
        placeholder="Назва категорії"
      />
      <div className={styles.errorMessage}>
        {errors?.categoryName && <p>{errors?.categoryName?.message}</p>}
      </div>
      <button className={styles.check}>
        <FaCheck />
      </button>
      <MdCancelPresentation
        className={styles.iconCancel}
        onClick={cancelHandler}
      />
    </form>
);

  return render
};

export default AddCategory;
