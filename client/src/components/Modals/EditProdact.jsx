import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import GetServices from '../../services/GetServices';

import { Modal, Select } from '../index';

import styles from './Modals.module.css';
import { fetchUpdateProdact } from '../../pages/Admin/AdminSlice';

const EditProdact = ({ active, setActive }) => {
  const prodact = useSelector((state) => state.prodact.prodact);
  const categories = useSelector((state) => state.home.category);
  const categoryName = useSelector((state) => state.prodact.category);
  const subcategories = useSelector((state) => state.home.subcategory);
  const subcategoryName = useSelector((state) => state.prodact.subcategory);

  const [category, setCategory] = useState(categoryName);
  const [subcategory, setSubcategory] = useState(subcategoryName);
  const [categoryId, setCategoryId] = useState(prodact.categoryId);

  const dispatch = useDispatch();

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

  const selectHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);
    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
    // setSubcategory('Оберіть підкатегорію');
  };

  const closeEditHandler = () => {
    setActive();
    setSubcategory(subcategoryName);
    setCategoryId(prodact.categoryId);
    setCategory(categoryName);
  };

  const onSubmit = (data) => {
    console.log(data);
    const selectedSubcategory = subcategories.filter(
      (item) => item.name === subcategory
    );
    let sizes = `${data.size1},${data.size2},${data.size3}`;

    const formData = new FormData();
    formData.append('name', data.prodactName);
    formData.append('price', data.price);
    formData.append('sizes', sizes);
    formData.append('info', data.info);
    formData.append('categoryId', categoryId);
    formData.append('subcategoryId', selectedSubcategory[0].id);

    dispatch(fetchUpdateProdact({ id: prodact.id, prodact: formData }));
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
            <Select name="category" value={category} onchange={selectHandler}>
              {categories.map((item) => (
                <option key={uuidv4()}>{item.name}</option>
              ))}
            </Select>

            <Select
              name="subcategory"
              value={subcategory}
              onchange={(e) => setSubcategory(e.target.value)}
            >
              {subcategories
                .filter((item) => item.categoryId === categoryId)
                .map((item) => (
                  <option key={uuidv4()}>{item.name}</option>
                ))}
            </Select>
          </div>
          <div className={styles.priceName}>
            <input
              className={!!errors.prodactName ? styles.redBorder : null}
              {...register('prodactName', {
                required: true,
              })}
            />

            <input
              type="number"
              className={!!errors.price ? styles.redBorder : null}
              {...register('price', {
                required: true,
              })}
            />
          </div>
          <div className={styles.sizes}>
            <input
              className={!!errors.size1 ? styles.redBorder : null}
              {...register('size1', {
                required: true,
              })}
            />

            <input
              className={!!errors.size2 ? styles.redBorder : null}
              {...register('size2', {
                required: true,
              })}
            />

            <input
              className={!!errors.size3 ? styles.redBorder : null}
              {...register('size3', {
                required: true,
              })}
            />
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
