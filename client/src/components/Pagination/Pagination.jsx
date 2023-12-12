import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { selectedLimit, selectedPage } from '../../pages/Home/HomeSlice';

import styles from './Pagination.module.css';

const Pagination = () => {
  const count = useSelector((state) => state.home.count);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);

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
    dispatch(selectedPage(num));
  };

  const prevHandler = () => {
    page !== 1
      ? dispatch(selectedPage(page - 1))
      : dispatch(selectedPage(pagesCount));
  };

  const nextHandler = () => {
    page !== pagesCount
      ? dispatch(selectedPage(page + 1))
      : dispatch(selectedPage(1));
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
        {pages.map((item) => (
          <p
            className={page === item ? styles.activePage : styles.allPage}
            key={uuidv4()}
            onClick={() => clickPageHandler(item)}
          >
            {item}
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
