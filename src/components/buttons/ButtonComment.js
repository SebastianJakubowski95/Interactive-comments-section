import classes from "./ButtonComment.module.css";
import editIcon from "../../assets/icon-edit.svg";
import replyIcon from "../../assets/icon-reply.svg";
import deleteIcon from "../../assets/icon-delete.svg";

const ButtonComment = (props) => {
  function onClickHandler() {
    props.onClick();
  }

  let btnClasses;

  if (props.type === "edit") {
    btnClasses = ` ${classes.btn} ${classes.edit}`;
    return (
      <button
        onClick={onClickHandler}
        className={
          props.isActive ? `${btnClasses} ${classes.active}` : btnClasses
        }>
        <img src={editIcon} alt={props.type} />
        <p className="username">Edit</p>
      </button>
    );
  } else if (props.type === "reply") {
    btnClasses = ` ${classes.btn} ${classes.reply}`;
    return (
      <button
        onClick={onClickHandler}
        className={
          props.isActive ? `${btnClasses} ${classes.active}` : btnClasses
        }>
        <img src={replyIcon} alt={props.type} />
        <p className="username">Reply</p>
      </button>
    );
  } else if (props.type === "delete") {
    btnClasses = ` ${classes.btn} ${classes.delete}`;
    return (
      <button onClick={() => props.onClick()} className={btnClasses}>
        <img src={deleteIcon} alt={props.type} />
        <p className="username">Delete</p>
      </button>
    );
  }
};

export default ButtonComment;
