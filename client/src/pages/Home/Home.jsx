import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination, SortBy, Prodacts } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetSubcategory,
} from './HomeSlice';
import { fetchGetGoogleUser } from '../Auth/AuthSlice';

import styles from './Home.module.css';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);
  const orderBy = useSelector((state) => state.home.orderBy);
  const sortBy = useSelector((state) => state.home.sortBy);
  const ratingById = useSelector((state) => state.prodact.rating);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchGetAllProdact({
        categoryId,
        subcategoryId,
        page,
        limit,
        orderBy,
        sortBy,
      })
    );
  }, [
    dispatch,
    categoryId,
    subcategoryId,
    page,
    limit,
    orderBy,
    sortBy,
    ratingById,
  ]);

  useEffect(() => {
    if (!isAuth) dispatch(fetchGetGoogleUser());
  }, [dispatch, isAuth]);

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>
      <SortBy />
      <Prodacts />
      <Pagination />
    </>
  );
}

export default Home;