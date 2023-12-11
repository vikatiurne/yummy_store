import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaFileDownload } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import GetServices from '../../services/GetServices';

import { Modal, Select } from '../index';

import { fetchCreateProdact } from '../../pages/Admin/AdminSlice';

import styles from './Modals.module.css';

const CreateProdact = ({ active, setActive }) => {
  const [category, setCategory] = useState('Оберіть категорію');
  const [subcategory, setSubcategory] = useState('Оберіть підкатегорію');
  const [categoryId, setCategoryId] = useState(null);
  const [fileName, setFileName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.home.category);
  const subcategories = useSelector((state) => state.home.subcategory);

  const selectHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);
    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
    setSubcategory('Оберіть підкатегорію');
  };

  const closeSubcategoryHandler = () => {
    setActive();
    setSubcategory('Оберіть підкатегорію');
    setCategoryId(null);
    setCategory('Оберіть категорію');
    setFileName('');
  };

  const onSubmit = (data) => {
    const selectedSubcategory = subcategories
      .filter((item) => item.categoryId === categoryId)
      .filter((item) => item.name === subcategory);

    let sizes = `${data.size1},${data.size2},${data.size3}`;

    const formData = new FormData();
    formData.append('name', data.prodactName);
    formData.append('price', data.price);
    formData.append('sizes', sizes);
    formData.append('info', data.info);
    formData.append('img', data.image[0]);
    formData.append('categoryId', categoryId);
    formData.append('subcategoryId', selectedSubcategory[0].id);

    dispatch(fetchCreateProdact(formData));
    closeSubcategoryHandler();
    reset();
  };

  return (
    <Modal active={active} setActive={closeSubcategoryHandler}>
      <div className={styles.modalTitle}>
        <p>Додати продукт</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.options}>
            <Select name="category" value={category} onchange={selectHandler}>
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
              onchange={(e) => setSubcategory(e.target.value)}
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
                placeholder="Назва продукта"
                {...register('prodactName', {
                  required: true,
                })}
              />
            </div>

            <div className={styles.errorMessage}>
              <input
                className={!!errors.price ? styles.redBorder : null}
                placeholder="Вартість продукта"
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
                placeholder="Розмір 1"
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
                placeholder="Розмір 2"
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
                placeholder="Розмір 3"
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
          <label className={styles.fileUpload}>
            <input
              type="file"
              {...register('image', {
                validate: {
                  acceptedFormats: (files) =>
                    ['image/jpeg', 'image/png', 'image/gif'].includes(
                      files[0]?.type
                    ) || 'Формат файла має бути PNG, JPEG або GIF',
                  lessThan10MB: (files) =>
                    files[0]?.size < 10000000 ||
                    'Розмір зображення не більше 10MB',
                  fileName: (files) => setFileName(files[0]?.name),
                },
              })}
            />
            {!fileName ? 'Завантажити зображення' : fileName}
            <FaFileDownload className={styles.iconDownload} />
          </label>
          <div className={styles.errorMessage}>
            {errors?.image && <p>{errors?.image?.message}</p>}
          </div>
          <textarea
            placeholder="Опис продукту"
            className={!!errors.info ? styles.redBorder : null}
            {...register('info', {
              required: true,
            })}
          />

          <input type="submit" className={styles.add} value="Додати" />
        </form>
      </div>
    </Modal>
  );
};

export default CreateProdact;
