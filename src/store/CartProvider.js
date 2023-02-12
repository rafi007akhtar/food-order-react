import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  const newItem = action.item;
  switch (action.type) {
    case "ADD":
      const updatedItems = [...state.items, newItem];
      const updatedTotalAmount =
        state.totalAmount + newItem.price * newItem.amount;
      return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };

    default:
      return defaultCartState;
  }
}

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item) => {
      dispatchCartAction({ type: "ADD", item: item });
    },
    removeItem: (itemId) => {
      dispatchCartAction({ type: "REMOVE", itemId: itemId });
    },
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
