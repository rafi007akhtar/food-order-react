import cartStyles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import appConstants from "../../store/constants";
import useHttp from "../../hooks/use-http";
import Checkout from "./Checkout";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  // const [orders, setOrders] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  function orderHandler(e) {
    e.preventDefault();
    setShowCheckoutForm(true);
  }

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

  const modalFooter = !showCheckoutForm && (
    <div className={cartStyles.actions}>
      <button onClick={props.closeCart} className={cartStyles["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button
          type="submit"
          onClick={orderHandler}
          className={cartStyles.button}
        >
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal closeModal={props.closeCart}>
      <ul className={cartStyles["cart-items"]}> {cartItems} </ul>
      <div className={cartStyles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalFooter}
      {showCheckoutForm && <Checkout onCancel={props.closeCart} cartItems={cartCtx.items} />}
    </Modal>
  );
}
