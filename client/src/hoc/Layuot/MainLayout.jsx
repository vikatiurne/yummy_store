import { Outlet } from 'react-router-dom';

import styles from './MainLoyaut.module.css';
import { Header } from '../../components';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
