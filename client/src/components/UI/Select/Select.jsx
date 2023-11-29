import styles from './Select.module.css';

const Select = ({ name, value, onchange, children }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onchange}
      className={styles.selectCategory}
      required
    >
      {children}
    </select>
  );
};

export default Select;
