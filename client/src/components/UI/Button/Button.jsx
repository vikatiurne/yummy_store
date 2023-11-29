const Button = ({ children, className, onclick }) => {
  return (
    <button className={className} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
