import cartStyles from "./Cart.module.css";
import Modal from "../UI/Modal";

export default function Cart(props) {
  const cartItems = [
    {
      id: "c1",
      name: "blah blah",
      amount: 69,
      price: 69,
    },
  ].map((item) => <li key={item.id}>{item.name}</li>);
  return (
    <Modal>
      <ul className={cartStyles["cart-items"]}> {cartItems} </ul>
      <div className={cartStyles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={cartStyles.actions}>
        <button className={cartStyles['button--alt']}>Close</button>
        <button className={cartStyles.button}>Order</button>
      </div>
    </Modal>
  );
}
