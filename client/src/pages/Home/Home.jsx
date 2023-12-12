import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination, SortBy, Prodacts } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetSubcategory,
  selectedCategory,
  selectedSubcategory,
} from './HomeSlice';
import { fetchGetGoogleUser } from '../Auth/AuthSlice';

import styles from './Home.module.css';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const categories = useSelector((state) => state.home.category);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const subcategories = useSelector((state) => state.home.subcategory);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);
  const orderBy = useSelector((state) => state.home.orderBy);
  const sortBy = useSelector((state) => state.home.sortBy);
  const ratingById = useSelector((state) => state.prodact.rating);
  const isDelProdact = useSelector((state) => state.admin.isDelProdact);
  const prodacts = useSelector((state) => state.home.prodacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  useEffect(() => {
    const currentCategory = categories.filter((item) => item.id === categoryId);

    if (!currentCategory.length) dispatch(selectedCategory(null));
  }, [dispatch, categories, categoryId]);

  useEffect(() => {
    const currentSubcategory = subcategories.filter(
      (item) => item.id === subcategoryId
    );
    if (!currentSubcategory.length) dispatch(selectedSubcategory(null));
  }, [dispatch, subcategories, subcategoryId]);

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
    isDelProdact,
  ]);

  useEffect(() => {
    dispatch(fetchGetGoogleUser());
  }, [dispatch]);

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>
      {prodacts.length !== 0 ? (
        <>
          <SortBy />
          <Prodacts />
          <Pagination />
        </>
      ) : (
        <p className={styles.empty}>Немає товарів для відображення</p>
        )}
    </>
  );
}

export default Home;
