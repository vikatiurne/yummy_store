import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateProdact } from '../../components';
import Button from '../../components/UI/Button/Button';
import Edit from '../../components/Modals/Edit';

import { fetchGetCategory, fetchGetSubcategory } from '../Home/HomeSlice';

import styles from './Admin.module.css';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [modalEditCategoryActive, setModalEditCategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);

  const isLogout = useSelector((state) => state.auth.isLogout);

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

  return !isLogout ? (
    <div className={styles.adminOptions}>
      <Button onclick={editCategoryHandler}>
        Редагувати категорії\підкатегорії
      </Button>
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
  ) : (
    <Navigate to="/" />
  );
};

export default Admin;
