import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  CreateCategory,
  CreateProdact,
  CreateSubcategory,
} from '../../components';
import Button from '../../components/UI/Button/Button';

import { fetchGetCategory, fetchGetSubcategory } from '../Home/HomeSlice';

import styles from './Admin.module.css';

const Admin = () => {
  const [modalCategoryActive, setModalCategoryActive] = useState(false);
  const [modalSubcategoryActive, setModalSubcategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSubcategory());
  }, [dispatch]);


  const subcategoryHandler = () => {
    setModalSubcategoryActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  };

  const prodactHandler = () => {
    setModalProdactActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  };

  return (
    <div className={styles.adminOptions}>
      <Button onclick={() => setModalCategoryActive(true)}>
        Додати категорію
      </Button>
      <Button onclick={subcategoryHandler}>Додати підкатегорію</Button>
      <Button onclick={prodactHandler}>Додати продукт</Button>
      <CreateCategory
        active={modalCategoryActive}
        setActive={() => setModalCategoryActive(false)}
      />
      <CreateSubcategory
        active={modalSubcategoryActive}
        setActive={() => setModalSubcategoryActive(false)}
      />
      <CreateProdact
        active={modalProdactActive}
        setActive={() => setModalProdactActive(false)}
      />
    </div>
  );
};

export default Admin;
