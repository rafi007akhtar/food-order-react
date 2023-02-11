import modalStyles from "./Modal.module.css";
import ReactDOM from "react-dom";

export default function Modal(props) {
  const modalJSX = (
    <>
      <div className={modalStyles.backdrop}></div>
      <div className={modalStyles.modal}>
        <div className={modalStyles.content}> {props.children} </div>
      </div>
    </>
  );
  return <>
    {ReactDOM.createPortal(modalJSX, document.querySelector('#overlays'))}
  </>;
}
