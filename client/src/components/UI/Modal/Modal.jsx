import { IoClose } from 'react-icons/io5';
import styles from './Modal.module.css';

const Modal = ({ active, setActive, children }) => {
  
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive()}
    >
      <div
        className={
          active
            ? `${styles.modalContent} ${styles.active}`
            : styles.modalContent
        }
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose className={styles.iconClose} onClick={()=>setActive()}/>
       
        {children}
      </div>
    </div>
  );
};

export default Modal;
