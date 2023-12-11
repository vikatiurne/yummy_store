import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';

import {
  fetchCreateSubcategory,
  isClickAddSubcat,
} from '../../pages/Admin/AdminSlice';

import styles from './AddSubcategory.module.css';

const AddSubcategory = ({ categoryId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(
      fetchCreateSubcategory({
        name: data.subcategoryName,
        categoryId,
      })
    );
    dispatch(isClickAddSubcat(false))
  };

  const cancelHandler = () => {
    dispatch(isClickAddSubcat(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        className={!!errors.editName ? styles.redBorder : styles.editName}
        placeholder="Назва підкатегорії"
        {...register('subcategoryName', {
          required: 'Поле має бути заповненим',
        })}
      />
      <div className={styles.errorMessage}>
        {errors?.subcategoryName && <p>{errors?.subcategoryName?.message}</p>}
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
};

export default AddSubcategory;
