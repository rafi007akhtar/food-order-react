import mealItemStyles from "./MealItem.module.css";

export default function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={mealItemStyles.meal}>
      <div>
        <h3>{props.children}</h3>
        <div className={mealItemStyles.description}>{props.description}</div>
        <div className={mealItemStyles.price}>{price}</div>
      </div>
      <div></div>
    </li>
  );
}
