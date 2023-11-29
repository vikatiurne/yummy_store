import { useSelector } from 'react-redux';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './Modals.module.css';

const AuthModal = ({ active, setActive }) => {
  const err = useSelector((state) => state.auth.error);
  const msg = useSelector((state) => state.auth.msg);

  const render = (
    <Modal active={active} setActive={setActive}>
      {(!!err || !!msg) && (
        <div className={styles.authModal}>
          {!!err ? <p>{err}</p> : <p>{msg}</p>}
          <Button onclick={setActive}>Зрозуміло</Button>
        </div>
      )}
    </Modal>
  );

  return render;
};

export default AuthModal;
