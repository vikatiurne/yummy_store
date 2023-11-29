import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';

import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  return (
    <div className={styles.adminWrapper}>
      <Link to="/admin">
        <Button className={styles.openAdminPanel}>Панель адміністратора</Button>
      </Link>
    </div>
  );
};

export default AdminPanel;
