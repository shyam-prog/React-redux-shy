import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import {
  cartActions,
  cartItemActions,
  cartItemFetch,
  cartItemReccieve,
} from "./components/store/indexRedux";
import React, { useEffect } from "react";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsShown = useSelector((state) => state.cartSlice.isShowCart);
  const notification = useSelector((state) => state.cartSlice.notification);
  const cart = useSelector((state) => state.cartItem);

  useEffect(() => {
    dispatch(cartItemReccieve(cart));
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(
        cartItemFetch(cart)
      );
    }
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && <Notification />}
      <Layout>
        {cartIsShown && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
