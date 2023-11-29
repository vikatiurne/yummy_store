import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

import CreateRating from '../Modals/CreateRating';
import WarningAuth from '../Modals/WarningAuth';

import { fetchCheckVote } from '../../pages/Prodact/ProdactSlice';

import styles from './Rating.module.css';

const Rating = ({ rating, prodactId, className }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalAuth, setActiveModalAuth] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.id);

  const clickRatingHandler = () => {
    if (userId) {
      dispatch(fetchCheckVote({ prodactId, userId }));
      setActiveModal(true);
    } else {
      setActiveModalAuth(true);
    }
  };

  return (
    <div className={className}>
      <CreateRating
        active={activeModal}
        prodactId={prodactId}
        setActive={() => setActiveModal(false)}
      />

      <WarningAuth
        active={activeModalAuth}
        setActive={() => setActiveModalAuth(false)}
      />

      <div className={styles.rating} onClick={clickRatingHandler}>
        <p>{rating}</p>
        <FaStar className={styles.activeStar} />
      </div>
    </div>
  );
};

export default Rating;
