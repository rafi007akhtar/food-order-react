import cartStyles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import appConstants from "../../store/constants";
import useHttp from "../../hooks/use-http";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [orders, setOrders] = useState(0);
  const [isOrderPlaced, err, isLoading, orderPlacer] = useHttp(
    `${appConstants.BASE_URL}${appConstants.ORDERS_EXTENSION}`,
    {
      method: "POST",
      body: cartCtx.items,
    }
  );

  const placeOrder = (e) => {
    e.preventDefault();
    console.log("placing order");
    setOrders((prevOrders) => prevOrders + 1);
    orderPlacer();
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
      onRemove={() => cartCtx.removeItem(item.id)}
    >
      {item.name}
    </CartItem>
  ));
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal closeModal={props.closeCart}>
      <form onSubmit={placeOrder}>
        <ul className={cartStyles["cart-items"]}> {cartItems} </ul>
        <div className={cartStyles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={cartStyles.actions}>
          <button
            onClick={props.closeCart}
            className={cartStyles["button--alt"]}
          >
            Close
          </button>
          {hasItems && (
            <button type="submit" className={cartStyles.button}>
              Order
            </button>
          )}
        </div>
      </form>

      {isLoading && <p>Placing your order...</p>}
      {isOrderPlaced && <p>Order placed!</p>}
      {err && <p>Oops, something went wrong.</p>}
    </Modal>
  );
}
