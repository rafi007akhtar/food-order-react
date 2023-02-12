import buttonStyles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((currentVal, item) => {
    return currentVal + item.amount
  }, 0);
  return (
    <button className={buttonStyles.button} onClick={props.onClick}>
      <span className={buttonStyles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={buttonStyles.badge}> { numberOfItems } </span>
    </button>
  );
}
