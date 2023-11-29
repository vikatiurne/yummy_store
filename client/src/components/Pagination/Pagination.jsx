import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { fetchGetAllProdact, selectedLimit } from '../../pages/Home/HomeSlice';

import styles from './Pagination.module.css';

const Pagination = () => {
  const [activePage, setActivePage] = useState(1);

  const count = useSelector((state) => state.home.count);
  const limit = useSelector((state) => state.home.limit);
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const orderBy = useSelector((state) => state.home.orderBy);
  const sortBy = useSelector((state) => state.home.sortBy);

  const pagesCount = Math.ceil(count / limit);

  const pages = [];
  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  const [limitProdact, setLimitProdact] = useState(limit);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedLimit(limitProdact));
  }, [dispatch, limitProdact]);

  const clickPageHandler = (num) => {
    setActivePage(num);
  };

  useEffect(() => {
    dispatch(
      fetchGetAllProdact({
        categoryId,
        subcategoryId,
        page: activePage,
        limit,
        orderBy,
        sortBy,
      })
    );
  }, [dispatch, activePage, categoryId, subcategoryId, limit, orderBy, sortBy]);

  const prevHandler = () => {
    activePage !== 1
      ? setActivePage(activePage - 1)
      : setActivePage(pagesCount);
  };

  const nextHandler = () => {
    pagesCount !== activePage
      ? setActivePage(activePage + 1)
      : setActivePage(1);
  };
  return (
    <>
      <div className={styles.countProdact}>
        <p>Всьго товарів {count}</p>
        <div className={styles.limit}>
          <p>Показати по</p>
          <input
            type="number"
            value={limitProdact}
            onChange={(e) => setLimitProdact(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={styles.pages}>
        <MdOutlineKeyboardDoubleArrowLeft
          className={styles.arrow}
          onClick={prevHandler}
        />
        {pages.map((page) => (
          <p
            className={activePage === page ? styles.activePage : styles.allPage}
            key={uuidv4()}
            onClick={() => clickPageHandler(page)}
          >
            {page}
          </p>
        ))}
        <MdOutlineKeyboardDoubleArrowRight
          className={styles.arrow}
          onClick={nextHandler}
        />
      </div>
    </>
  );
};

export default Pagination;
