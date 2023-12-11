import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTriangleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import styles from './Categories.module.css';
import {
  selectedCategory,
  selectedSubcategory,
} from '../../pages/Home/HomeSlice';

const Categories = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleSubcategoryList, setVisibleSubcategoryList] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Вся випічка');
  const [subcategory, setSubcategory] = useState('');

  const categories = useSelector((state) => state.home.category);
  const subcategories = useSelector((state) => state.home.subcategory);
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      const currentCategory = categories.filter(
        (item) => item.id === categoryId
      );
      if (!!currentCategory.length) {
        const name = currentCategory[0].name;
        setActiveItem(name);
        setSelectedSort(name);
      } else {
        setActiveItem(null);
        setSelectedSort(null);
      }
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (subcategoryId) {
      const currentSubcategory = subcategories.filter(
        (item) => item.id === subcategoryId
      );
      currentSubcategory.length !== 0
        ? setSubcategory(currentSubcategory[0].name)
        : setSubcategory('');
    }
  }, [subcategories, subcategoryId]);

  const clickAllCategoryHandler = () => {
    setActiveItem(null);
    dispatch(selectedCategory(null));
    dispatch(selectedSubcategory(null));
    setSubcategory('');
  };

  const clickCategoryHandler = (name, id) => {
    setActiveItem(name);
    setSelectedSort(name);
    setSubcategory('');
    dispatch(selectedCategory(id));
    dispatch(selectedSubcategory(null));
  };

  const clickSubcategoryHandler = (id) => {
    dispatch(selectedSubcategory(id));
    setVisibleSubcategoryList(false);
  };

  const renderSubcategory = (
    <ul className={styles.select}>
      {subcategories
        .filter((item) => item.categoryId === categoryId)
        .map((item) => (
          <li key={uuidv4()} onClick={() => clickSubcategoryHandler(item.id)}>
            {item.name}
          </li>
        ))}
    </ul>
  );

  const renderCategory = categories.map((item) => (
    <div key={uuidv4()}>
      <li
        className={activeItem === item.name ? styles.active : null}
        onClick={() => clickCategoryHandler(item.name, item.id)}
      >
        {item.name}
        {activeItem === item.name && (
          <BsTriangleFill
            className={
              visibleSubcategoryList ? styles.arrowDown : styles.arrowTop
            }
            onClick={() => setVisibleSubcategoryList((prev) => !prev)}
          />
        )}
      </li>
      {visibleSubcategoryList && activeItem === item.name && renderSubcategory}
    </div>
  ));

  return (
    <>
      <ul className={styles.sortByButtons}>
        <li
          className={activeItem === null ? styles.active : null}
          onClick={clickAllCategoryHandler}
        >
          Всі
        </li>
        {renderCategory}
      </ul>
      <div className={styles.containerContent}>
        <h2>
          {activeItem === null ? 'Вся випічка' : selectedSort}
          {!!subcategory ? ` (${subcategory})` : null}
        </h2>
      </div>
    </>
  );
};

export default Categories;
