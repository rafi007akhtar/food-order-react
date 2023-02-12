import mealItemFormStyles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

export default function MealItemForm(props) {
  const [unableToAdd, setUnableToAdd] = useState(false);
  const amountRef = useRef();

  function preAddItem() {
    const numberOfItems = +amountRef.current.value;
    if (
      numberOfItems < 1 ||
      numberOfItems > 5 ||
      !amountRef.current.value.trim().length
    ) {
      setUnableToAdd(true);
      return;
    }
    props.onAddToCart(+amountRef.current.value);
  }

  return (
    <form className={mealItemFormStyles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          ref: amountRef,
        }}
      />
      <button type="button" onClick={preAddItem}>
        + Add
      </button>
      {unableToAdd && <p>Can only add between 1 and 5 amounts. </p>}
    </form>
  );
}
