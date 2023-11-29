import { Link } from 'react-router-dom';
import { Home, Basket } from '../pages';


const Menu = () => {
  return (
    <>
      <Link to=".">
        <Home />
      </Link>
      <Link to="basket">
        <Basket />
      </Link>
    </>
  );
};

export default Menu;
