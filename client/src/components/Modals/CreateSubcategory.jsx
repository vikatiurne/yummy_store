import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { Modal, Select } from '../index';

import { fetchCreateSubcategory } from '../../pages/Admin/AdminSlice';
import { fetchGetSubcategory } from '../../pages/Home/HomeSlice';
import GetServices from '../../services/GetServices';

import styles from './Modals.module.css';

const CreateSubcategory = ({ active, setActive }) => {
  const [category, setCategory] = useState('Оберіть категорію');
  const [categoryId, setCategoryId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const subcategories = useSelector((state) => state.home.subcategory);
  const categories = useSelector((state) => state.home.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  const selectHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);

    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
  };

  const closeSubcategoryHandler = () => {
    setActive();
    setCategoryId(null);
    setCategory('Оберіть категорію');
  };

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      fetchCreateSubcategory({
        name: data.subcategoryName,
        categoryName: category,
      })
    );
    setActive();
    setCategoryId(null);
    setCategory('Оберіть категорію');
    reset();
  };

  const renderSubcategoryList = subcategories
    .filter((item) => item.categoryId === categoryId)
    .map((item) => <li key={uuidv4()}>{item.name}</li>);

  return (
    <Modal active={active} setActive={closeSubcategoryHandler}>
      <div className={styles.modalTitle}>
        <p>Додати підкатегорію</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select name="category" value={category} onchange={selectHandler}>
            {category==="Оберіть категорію" && <option value="">Оберіть категорію</option>}
            {categories.map((item) => (
              <option key={uuidv4()}>{item.name}</option>
            ))}
          </Select>
          <input
            className={!!errors.subcategoryName ? styles.redBorder : null}
            placeholder="Назва підкатегорії"
            {...register('subcategoryName', {
              required: 'Поле має бути заповненим',
            })}
          />
          <div className={styles.errorMessage}>
            {errors?.subcategoryName && (
              <p>{errors?.subcategoryName?.message}</p>
            )}
          </div>
          <input type="submit" className={styles.add} value="Додати" />
        </form>
        <div className={styles.subcategoryList}>
          {!!categoryId && <p>Існуючі підкатегорії:</p>}
          <ul>{renderSubcategoryList}</ul>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubcategory;
