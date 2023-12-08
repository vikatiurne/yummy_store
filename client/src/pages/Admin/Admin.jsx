import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  CreateProdact,
} from '../../components';
import Button from '../../components/UI/Button/Button';

import { fetchGetCategory, fetchGetSubcategory } from '../Home/HomeSlice';

import styles from './Admin.module.css';
import Edit from '../../components/Modals/Edit';

const Admin = () => {
  const [modalEditCategoryActive, setModalEditCategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

   const prodactHandler = () => {
    setModalProdactActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  };

  const editCategoryHandler = () => {
    setModalEditCategoryActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  };

  return (
    <>
      <div className={styles.adminOptions}>
      <Button onclick={editCategoryHandler}>Редагувати категорію\підкатегорію</Button>
        <Button onclick={prodactHandler}>Додати продукт</Button>
      
        <Edit
          active={modalEditCategoryActive}
          setActive={() => setModalEditCategoryActive(false)}
        />
        <CreateProdact
          active={modalProdactActive}
          setActive={() => setModalProdactActive(false)}
        />
      </div>
      
    </>
  );
};

export default Admin;
