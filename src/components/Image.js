import classes from "./Image.module.css";

const Image = (props) => {
  const btnClass = classes[props.size];
  const userIsActive = `${classes["user-active"]} ${classes[props.size]}`;

  return (
    <img
      className={props.isU ? userIsActive : btnClass}
      src={props.userImg}
      alt="user image"
    />
  );
};

export default Image;
