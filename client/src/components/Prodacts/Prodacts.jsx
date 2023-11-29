import { useSelector } from 'react-redux';
import { ProdactCard } from '..';
import styles from './Prodacts.module.css';

const Prodacts = () => {
  const prodacts = useSelector((state) => state.home.prodacts);

  const renderCard = prodacts.map((item) => (
    <ProdactCard key={`${item.name}+${item.id}`} {...item} />
  ));

  return <div className={styles.content}>{renderCard}</div>;
};

export default Prodacts;
