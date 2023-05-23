import classes from "./ButtonLarge.module.css";

const ButtonLarge = (props) => {
  if (
    props.type === "send" ||
    props.type === "update" ||
    props.type === "reply"
  ) {
    let mess;
    if (props.type === "send") {
      mess = "SEND";
      return (
        <button className={`${classes.btn}  ${classes.regular} `}>
          <p>{mess}</p>
        </button>
      );
    } else if (props.type === "update") {
      mess = "UPDATE";
      return (
        <button
          className={`${classes.btn}  ${classes.regular} `}
          onClick={() => props.onClick()}>
          <p>{mess}</p>
        </button>
      );
    } else if (props.type === "reply") {
      mess = "REPLY";
      return (
        <button className={`${classes.btn}  ${classes.regular} `}>
          <p>{mess}</p>
        </button>
      );
    }
    return (
      <button
        className={`${classes.btn}  ${classes.regular} `}
        onClick={() => props.onClick()}>
        <p>{mess}</p>
      </button>
    );
  } else if (props.type === "delete") {
    return (
      <button
        onClick={() => props.onClick()}
        className={`${classes.btn}  ${classes.delete} `}>
        <p>YES, DELETE</p>
      </button>
    );
  } else if (props.type === "cancel") {
    return (
      <button
        onClick={() => props.onClick()}
        className={`${classes.btn}  ${classes.cancel} `}>
        <p>NO, CANCEL</p>
      </button>
    );
  } else if (props.type === "edit") {
    return (
      <button
        onClick={() => props.onClick()}
        className={`${classes.btn}  ${classes.cancel} `}>
        <p>GO BACK</p>
      </button>
    );
  } else if (props.type === "abandon") {
    return (
      <button
        onClick={() => props.onClick()}
        className={`${classes.btn}  ${classes.delete} `}>
        <p>ABANDON</p>
      </button>
    );
  }
};

export default ButtonLarge;
