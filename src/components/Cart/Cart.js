import cartStyles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items.map((item, id) => <li key={id}>{item.name}</li>);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal closeModal={props.closeCart}>
      <ul className={cartStyles["cart-items"]}> {cartItems} </ul>
      <div className={cartStyles.total}>
        <span>Total Amount</span>
        <span>{ totalAmount }</span>
      </div>
      <div className={cartStyles.actions}>
        <button onClick={props.closeCart} className={cartStyles['button--alt']}>Close</button>
        {hasItems && <button className={cartStyles.button}>Order</button>}
      </div>
    </Modal>
  );
}
