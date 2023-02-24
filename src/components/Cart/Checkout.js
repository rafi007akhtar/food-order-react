import styles from "./Checkout.module.css";
import appConstants from "../../store/constants";
import useHttp from "../../hooks/use-http";
import { useRef, useState } from "react";

export default function Checkout(props) {
  const [isOrderPlaced, err, isLoading, orderPlacer] = useHttp(
    `${appConstants.BASE_URL}${appConstants.ORDERS_EXTENSION}`,
    {
      method: "POST",
      body: props.cartItems,
    }
  );
  const [formControlsValidity, setFormControlsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const name = useRef();
  const street = useRef();
  const postal = useRef();
  const city = useRef();

  function formValidation(refs) {
    const fields = Object.keys(formControlsValidity);
    let formIsValid = true;
    const stateAfterValidation = {};
    refs.forEach((ref, ind) => {
      const val = ref.current.value;
      const field = fields[ind];
      if (val.trim().length === 0) {
        stateAfterValidation[field] = false;
        formIsValid = false;
      } else {
        stateAfterValidation[field] = true;
      }
    });
    // eslint-disable-next-line no-unused-vars
    const [n, s, postal, ...rest] = refs;
    if (formIsValid && postal.current.value.trim().length !== 5) {
        stateAfterValidation.postal = false;
        formIsValid = false;
    }
    setFormControlsValidity(stateAfterValidation);
    return formIsValid;
  }

  function onSubmitHanlder(e) {
    e.preventDefault();
    const formIsValid = formValidation([name, street, postal, city]);
    if (formIsValid) orderPlacer();
    else console.log("form is invalid");
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHanlder}>
      <div className={`${styles.control} ${!formControlsValidity.name && styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={name} />
        {!formControlsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${styles.control} ${!formControlsValidity.street && styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={street} />
        {!formControlsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${styles.control} ${!formControlsValidity.postal && styles.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postal} />
        {!formControlsValidity.postal && <p>Please enter a valid postal.</p>}
      </div>
      <div className={`${styles.control} ${!formControlsValidity.city && styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={city} />
        {!formControlsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit}>
          Confirm order
        </button>
      </div>

      {isLoading && <p>Placing your order...</p>}
      {isOrderPlaced && <p>Order placed!</p>}
      {err && <p>Oops, something went wrong.</p>}
    </form>
  );
}
