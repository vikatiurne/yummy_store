import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './Modals.module.css';
import { Link } from 'react-router-dom';

const WarningAuth = ({ active, setActive }) => {
  const render = (
    <Modal active={active} setActive={setActive}>
      <div className={styles.authModal}>
        <p>Голосувати можуть тількі зареєстровані користувачі</p>
        <div className={styles.control}>
        <Button onclick={setActive}>Зрозуміло</Button>
        <Link to="/auth"><Button onclick={setActive}>Увійти</Button></Link>
        </div>
      </div>
    </Modal>
  );

  return render;
};

export default WarningAuth;
