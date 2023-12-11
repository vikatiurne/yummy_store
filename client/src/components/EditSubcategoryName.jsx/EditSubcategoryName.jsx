import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';

import {
  fetchUpdateSubcategory,
  isClickEditSubcat,
} from '../../pages/Admin/AdminSlice';

import styles from './EditSubcategoryName.module.css';

const EditSubcategoryName = ({ id }) => {
  const subcategory = useSelector((state) => state.prodact.subcategory);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { subcategoryName: subcategory },
  });

  const dispatch = useDispatch();

  const chancheSubcategoryNameHandler = (data) => {
    dispatch(
      fetchUpdateSubcategory({ id, subcategoryName: data.subcategoryName })
    );
    dispatch(isClickEditSubcat(false));
  };

  const cancelHandler = () => {
    dispatch(isClickEditSubcat({ isEdit: false }));
  };

  const render = (
    <form
      onSubmit={handleSubmit(chancheSubcategoryNameHandler)}
      className={styles.form}
    >
      <input
        className={
          !!errors.subcategoryName ? styles.redBorder : styles.editName
        }
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
  return render;
};

export default EditSubcategoryName;
