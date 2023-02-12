import mealItemStyles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

export default function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={mealItemStyles.meal}>
      <div>
        <h3>{props.children}</h3>
        <div className={mealItemStyles.description}>{props.description}</div>
        <div className={mealItemStyles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={(amt) => cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amt,
            price: props.price
        })} />
      </div>
    </li>
  );
}
