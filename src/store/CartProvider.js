import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  let updatedItems;
  let existingItemInd;
  let updatedTotalAmount;
  switch (action.type) {
    case "ADD":
      let newItem = action.item;
      updatedTotalAmount = state.totalAmount + newItem.price * newItem.amount;
      existingItemInd = state.items.findIndex((item) => item.id === newItem.id);
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
      return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE":
      existingItemInd = state.items.findIndex(
        (item) => item.id === action.itemId
      );
      if (existingItemInd === -1) return;

      const itemToRemove = state.items[existingItemInd];
      updatedTotalAmount = state.totalAmount - itemToRemove.price;
      if (itemToRemove.amount > 1) {
        // decrease count by 1
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemInd] = updatedItem;
      } else {
        // remove this from the cart
        updatedItems = state.items.filter((item) => item.id !== action.itemId);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "CLEAR":
      return defaultCartState;

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
    clearCart: () => {
      dispatchCartAction({ type: "CLEAR" });
    },
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
