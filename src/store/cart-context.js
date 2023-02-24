import React from "react";

const originalContextObj = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (itemId) => {},
    clearCart: () => {}
}

const CartContext = React.createContext({...originalContextObj});

export default CartContext;
export {originalContextObj};
