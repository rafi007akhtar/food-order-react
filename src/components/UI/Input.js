import inputStyles from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={inputStyles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} /> {/* This will ensure everything in input object is applied as an attribute */}
    </div>
  );
}
