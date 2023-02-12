import React from "react";
import inputStyles from "./Input.module.css";

function InputPreRef(props, ref) {
  return (
    <div className={inputStyles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.input.id} {...props.input} /> {/* This will ensure everything in input object is applied as an attribute */}
    </div>
  );
}

const Input = React.forwardRef(InputPreRef);
export default Input;
