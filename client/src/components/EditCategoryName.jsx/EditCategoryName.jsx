import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';

import { fetchUpdateCategory, isClickEdit } from '../../pages/Admin/AdminSlice';

import styles from './EditCategoryName.module.css';

const EditCategoryName = ({ id }) => {
  const category = useSelector((state) => state.prodact.category);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: { categoryName: category } });

  const dispatch = useDispatch();

  const chancheCategoryNameHandler = (data) => {
    dispatch(fetchUpdateCategory({ id, categoryName: data.categoryName }));
    dispatch(isClickEdit(false));
  };
  const cancelHandler = () => {
    dispatch(isClickEdit({isEdit: false }));
  };

  const render = (
    <form
      onSubmit={handleSubmit(chancheCategoryNameHandler)}
      className={styles.form}
    >
      <input
        className={!!errors.categoryName ? styles.redBorder : styles.editName}
        {...register('categoryName', {
          required: 'Поле має бути заповненим',
        })}
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
  return render;
};

export default EditCategoryName;
