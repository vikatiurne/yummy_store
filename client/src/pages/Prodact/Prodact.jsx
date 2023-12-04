import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { spinners } from '../../components/UI/Spinner/Spiner';
import { Button } from '../../components';
import Rating from '../../components/Rating/Rating';
import EditProdact from '../../components/Modals/EditProdact';

import {
  fetchGetCategory,
  fetchGetProdact,
  fetchGetSubcategory,
} from './ProdactSlice';
import { fetchAppendProdact } from '../Basket/BasketSlice';

import styles from './Prodact.module.css';

const Prodact = () => {
  const [inBasket, setInBasket] = useState(false);
  const [qtyInBasket, setQtyInBasket] = useState(null);
  const [qtyAddProdact, setQtyAddProdact] = useState(0);
  const [modalProdactActive, setModalProdactActive] = useState(false);

  const prodact = useSelector((state) => state.prodact.prodact);
  const ratingById = useSelector((state) => state.prodact.rating);
  const basket = useSelector((state) => state.basket.order);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.prodact.status);
  const isUpdated = useSelector((state) => state.admin.isUpdate);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'success') setQtyAddProdact(parseInt(prodact.sizes[0]));
  }, [prodact, status]);

  useEffect(() => {
    const prodactInBasket = basket.filter((prodact) => prodact.id === +id);
    if (!!prodactInBasket.length) {
      setInBasket(true);
      const qty = `${
        prodactInBasket[0].basket_prodact.qty
      }${prodactInBasket[0].sizes[0].replace(/[^a-zа-яё]/gi, '')}`;
      setQtyInBasket(qty);
    }
  }, [basket, id]);

  useEffect(() => {
    dispatch(fetchGetProdact({ id }));
  }, [dispatch, id, ratingById, isUpdated]);

  useEffect(() => {
    dispatch(fetchGetCategory({ id: prodact.categoryId }));
    dispatch(fetchGetSubcategory({ id: prodact.subcategoryId }));
  }, [dispatch, prodact]);

  const changeQtyHandler = (e) => {
    setQtyAddProdact(e.target.value);
  };

  const addHandler = () => {
    const minOrder = parseInt(prodact.sizes[0]);
    let qty;
    qtyAddProdact >= minOrder ? (qty = qtyAddProdact) : (qty = minOrder);
    dispatch(fetchAppendProdact({ prodactId: id, qty, userId: user.id }));
  };

  const editHandler = () => {
    setModalProdactActive(true);
  };

  return status !== 'success' ? (
    spinners.fidgetSpinner()
  ) : (
    <>
      <h2 className={styles.ptodactName}>{prodact.name}</h2>
      <div className={styles.container}>
        <div className={styles.prodactImg}>
          <img
            src={process.env.REACT_APP_API_URL + prodact.img}
            alt={prodact.name}
          />
          <Rating
            rating={prodact.rating}
            prodactId={id}
            className={styles.rate}
          />
        </div>
        <div className={styles.prodactInfo}>
          <h4>
            <b>Опис продукту:</b>
          </h4>
          <p className={styles.prodactDiscription}>
            {prodact.info[0].discription}
          </p>
          <p>
            <b>Мінімальне замовлення:</b> <span>{prodact.sizes[0]}</span>
          </p>
          <p>
            <b>Вартість:</b>
            <span>
              {prodact.price} грн за {prodact.sizes[0]}
            </span>
          </p>
        </div>
      </div>

      <EditProdact
        active={modalProdactActive}
        setActive={() => setModalProdactActive(false)}
      />

      {user.role === 'ADMIN' ? (
        <div className={styles.addProdact}>
          <Button className={styles.btn} onclick={editHandler}>
            Редагувати
          </Button>
        </div>
      ) : inBasket ? (
        <div className={styles.addProdact}>
          <Link to="/basket">
            <Button className={styles.btn}>
              Товар у кошику ({qtyInBasket})
            </Button>
          </Link>
        </div>
      ) : (
        <div className={styles.addProdact}>
          <input
            type="number"
            value={qtyAddProdact}
            onChange={(e) => changeQtyHandler(e)}
            autoFocus
          />
          <p>{prodact.sizes[0].replace(/[^a-zа-яё]/gi, '')}</p>
          <Button className={styles.btn} onclick={addHandler}>
            Покласти у кошик
          </Button>
        </div>
      )}
    </>
  );
};

export default Prodact;
