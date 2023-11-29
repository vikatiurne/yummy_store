import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import { spinners } from '../UI/Spinner/Spiner';

import {
  fetchCreateRating,
  // fetchGetRating,
} from '../../pages/Prodact/ProdactSlice';

import styles from './Modals.module.css';

const ratingPanel = ['★', '★', '★', '★', '★'];

const CreateRating = ({ active, setActive, prodactId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const msg = useSelector((state) => state.prodact.msg);
  const status = useSelector((state) => state.prodact.statusRate);

  const dispatch = useDispatch();

  const voteHandler = () => {
    dispatch(fetchCreateRating({ rating, prodactId }));
    // dispatch(fetchGetRating({ prodactId }));
    setActive();
  };

  const renderContent = (
    <Modal active={active} setActive={setActive}>
      {status === 'loading' ? (
        spinners.fidgetSpinner()
      ) : !msg ? (
        <>
          <div className={styles.stars}>
            {ratingPanel.map((item, i) => {
              const val = i + 1;
              return (
                <p
                  className={val <= (rating || hover) ? styles.starFill : null}
                  key={uuidv4()}
                  onClick={() => setRating(val)}
                  onMouseEnter={() => setHover(val)}
                  onMouseLeave={() => setHover(null)}
                >
                  {item}
                </p>
              );
            })}
          </div>
          <Button onclick={voteHandler}>Голосувати</Button>
        </>
      ) : (
        <div className={styles.ratingModal}>
          <p>{msg}</p>
          <Button onclick={setActive}>Зрозуміло</Button>
        </div>
      )}
    </Modal>
  );

  return renderContent;
};

export default CreateRating;
