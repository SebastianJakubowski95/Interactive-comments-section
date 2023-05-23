import classes from "./ModalWarning.module.css";
import WrapperCard from "../WrapperCard";
import ButtonLarge from "../buttons/ButtonLarge";
import { createPortal } from "react-dom";

const ModalWarning = (props) => {
  let type;

  if (props.type === "editModal") {
    type = ["abandon", "edit"];
  } else if (props.type === "deleteModal") {
    type = ["delete", "cancel"];
  }

  const modal = (
    <div className={classes.modal}>
      <WrapperCard type="modal-warning">
        <div className={classes.main}>
          <h1>{props.title}</h1>
          <p>{props.body}</p>
          <div className={classes.cta}>
            <ButtonLarge type={type[0]} onClick={props.proceed} />
            <ButtonLarge type={type[1]} onClick={props.cancel} />
          </div>
        </div>
      </WrapperCard>
    </div>
  );

  return <>{createPortal(modal, document.getElementById("modal"))}</>;
};

export default ModalWarning;
