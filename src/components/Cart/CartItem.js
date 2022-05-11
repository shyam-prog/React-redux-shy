import classes from "./CartItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartItemActions } from "../store/indexRedux";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(
      cartItemActions.addItemHandler({
        id,
        name: title,
        price,
      })
    );
  };

  const removeItemFromCart = () => {
    dispatch(cartItemActions.removeItemHandler(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCart}>-</button>
          <button onClick={addItemToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;