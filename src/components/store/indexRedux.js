import { createSlice, configureStore } from "@reduxjs/toolkit";

const toggleCart = { isShowCart: false, notification: null };

const cartSlice = createSlice({
  name: "toggleCart",
  initialState: toggleCart,
  reducers: {
    toggleCartHandler(state) {
      state.isShowCart = !state.isShowCart;
    },
    notificationHandler(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const cartItemState = { items: [], totalQuantity: 0, changed: false };

const cartItem = createSlice({
  name: "cartItem",
  initialState: cartItemState,

  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemHandler(state, action) {
      const newItem = action.payload;
      let existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          id: newItem.id,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemHandler(state, action) {
      let id = action.payload;
      let existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cartSlice: cartSlice.reducer,
    cartItem: cartItem.reducer,
  },
});

export const cartItemReccieve = (cart) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "firebaseURl"
      );
      if (!response.ok) {
        throw new Error("Colud not fetch Data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchData();
      dispatch(
        cartItemActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        cartActions.notificationHandler({
          status: "error",
          title: "Error!",
          message: "Sending Data has Failed..",
        })
      );
    }
  };
};

export const cartItemFetch = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartActions.notificationHandler({
        status: "sending",
        title: "Sending!",
        message: "Data is sending..",
      })
    );
    const sendingData = async () => {
      const response = await fetch(
        "firebaseURL",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
    };
    try {
      await sendingData();
      dispatch(
        cartActions.notificationHandler({
          status: "success",
          title: "Success!",
          message: "Sent Data Successfully..",
        })
      );
    } catch (error) {
      dispatch(
        cartActions.notificationHandler({
          status: "error",
          title: "Error!",
          message: "Sending Data has Failed..",
        })
      );
    }
  };
};
export const cartActions = cartSlice.actions;
export const cartItemActions = cartItem.actions;
export default store;
