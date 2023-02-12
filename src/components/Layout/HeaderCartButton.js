import buttonStyles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

export default function HeaderCartButton(props) {
  const [animateButton, setAnimateButton] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((currentVal, item) => {
    return currentVal + item.amount;
  }, 0);

  const btnClasses = `${buttonStyles.button} ${
    animateButton ? buttonStyles.bump : ""
  }`;

  useEffect(() => {
    let animationTimer;

    if (cartCtx.items.length) {
      setAnimateButton(true);
      animationTimer = setTimeout(() => {
        setAnimateButton(false);
      }, 300);
    }

    return () => {
      clearTimeout(animationTimer)
    }
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={buttonStyles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={buttonStyles.badge}> {numberOfItems} </span>
    </button>
  );
}
