import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { fetchUpdateProdact } from '../../pages/Admin/AdminSlice';
import GetServices from '../../services/GetServices';

import { Modal, Select } from '../index';

import styles from './Modals.module.css';

const EditProdact = ({ active, setActive }) => {
  const prodact = useSelector((state) => state.prodact.prodact);
  const categories = useSelector((state) => state.home.category);
  const categoryName = useSelector((state) => state.prodact.category);
  const subcategories = useSelector((state) => state.home.subcategory);
  const subcategoryName = useSelector((state) => state.prodact.subcategory);

  const [category, setCategory] = useState(categoryName);
  const [subcategory, setSubcategory] = useState(subcategoryName);
  const [categoryId, setCategoryId] = useState(prodact.categoryId);
  const [subcategoryId, setSabcategoryId] = useState(prodact.subcategoryId);

  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      prodactName: prodact.name,
      price: prodact.price,
      size1: prodact.sizes[0],
      size2: prodact.sizes[1],
      size3: prodact.sizes[2],
      info: prodact.info[0].discription,
      category: categoryName,
      subcategory: subcategoryName,
    },
  });

  const categoryHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);
    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
    setSubcategory('Оберіть підкатегорію');
  };

  const subcategoryHandler = async (e) => {
    setSubcategory(e.target.value);
    const subcategories = await GetServices.getSubcategories();
    const filterSubcategory = await subcategories.data.filter(
      (subcategory) => subcategory.name === e.target.value
    );
    setSabcategoryId(filterSubcategory[0].id);
  };

  const closeEditHandler = () => {
    setActive();
    setSubcategory(subcategoryName);
    setCategoryId(prodact.categoryId);
    setCategory(categoryName);
  };

  const onSubmit = (data) => {
    let sizes = `${data.size1},${data.size2},${data.size3}`;

    const formData = new FormData();
    formData.append('name', data.prodactName);
    formData.append('price', +data.price);
    formData.append('sizes', sizes);
    formData.append('info', data.info);
    formData.append('categoryId', categoryId);
    formData.append('subcategoryId', subcategoryId);

    dispatch(fetchUpdateProdact({ id, formData }));
    closeEditHandler();
    reset();
  };

  return (
    <Modal active={active} setActive={closeEditHandler}>
      <div className={styles.modalTitle}>
        <p>Редагувати продукт</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.options}>
            <Select name="category" value={category} onchange={categoryHandler}>
              {category === 'Оберіть категорію' && (
                <option value="">Оберіть категорію</option>
              )}
              {categories.map((item) => (
                <option key={uuidv4()}>{item.name}</option>
              ))}
            </Select>

            <Select
              name="subcategory"
              value={subcategory}
              onchange={subcategoryHandler}
            >
              {subcategory === 'Оберіть підкатегорію' && (
                <option value="">Оберіть підкатегорію</option>
              )}
              {!categoryId
                ? subcategories.map((item) => (
                    <option key={uuidv4()}>{item.name}</option>
                  ))
                : subcategories
                    .filter((item) => item.categoryId === categoryId)
                    .map((item) => <option key={uuidv4()}>{item.name}</option>)}
            </Select>
          </div>
          <div className={styles.priceName}>
            <div>
              <input
                className={!!errors.prodactName ? styles.redBorder : null}
                {...register('prodactName', {
                  required: true,
                })}
              />
            </div>

            <div className={styles.errorMessage}>
              <input
                className={!!errors.price ? styles.redBorder : null}
                {...register('price', {
                  required: true,
                  pattern: {
                    value: /(^(\d+)$)/g,
                    message: 'Поле має містити тільки цифри',
                  },
                })}
              />

              {errors?.price && <p>{errors?.price?.message}</p>}
            </div>
          </div>

          <div className={styles.sizes}>
            <div className={styles.errorMessage}>
              <input
                className={!!errors.size1 ? styles.redBorder : null}
                {...register('size1', {
                  required: true,
                  pattern: {
                    value: /(\d+[a-zA-ZА-Яа-яЇїІіЄєҐґ']+$)/,
                    message: 'Поле має містити цифри та букви',
                  },
                })}
              />
              {errors?.size1 && (
                <p className={styles.errSize}>{errors?.size1?.message}</p>
              )}
            </div>

            <div className={styles.errorMessage}>
              <input
                className={!!errors.size2 ? styles.redBorder : null}
                {...register('size2', {
                  required: true,
                  pattern: {
                    value: /(\d+[a-zA-ZА-Яа-яЇїІіЄєҐґ']+$)/,
                    message: 'Поле має містити цифри та букви',
                  },
                })}
              />
              {errors?.size2 && (
                <p className={styles.errSize}>{errors?.size2?.message}</p>
              )}
            </div>

            <div className={styles.errorMessage}>
              <input
                className={!!errors.size3 ? styles.redBorder : null}
                {...register('size3', {
                  required: true,
                  pattern: {
                    value: /(\d+[a-zA-ZА-Яа-яЇїІіЄєҐґ']+$)/,
                    message: 'Поле має містити цифри та букви',
                  },
                })}
              />
              {errors?.size3 && (
                <p className={styles.errSize}>{errors?.size3?.message}</p>
              )}
            </div>
          </div>

          <textarea
            className={!!errors.info ? styles.redBorder : null}
            {...register('info', {
              required: true,
            })}
          />

          <input type="submit" className={styles.add} value="Зберегти зміни" />
        </form>
      </div>
    </Modal>
  );
};

export default EditProdact;
