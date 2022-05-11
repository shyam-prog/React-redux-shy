import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/indexRedux';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cartItem.totalQuantity);

  const toggleCart = () => {
    dispatch(cartActions.toggleCartHandler());
  }
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotalAmount}</span>
    </button>
  );
};

export default CartButton;
