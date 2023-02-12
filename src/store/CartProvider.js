import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  let newItem = action.item;
  let updatedItems;
  switch (action.type) {
    case "ADD":
      const existingItemInd = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemInd !== -1) {
        newItem = {
          ...newItem,
          amount: newItem.amount + state.items[existingItemInd].amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemInd] = newItem;
      } else {
        updatedItems = [...state.items, newItem];
      }
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
