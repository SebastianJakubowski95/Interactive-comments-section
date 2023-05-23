import classes from "./WrapperCard.module.css";
import { useImperativeHandle, forwardRef, useRef } from "react";

const WrapperCard = forwardRef((props, ref) => {
  const cardRef = useRef();

  function animationActivateGreen() {
    cardRef.current.classList.add(`${classes["color-animation"]}`);
    setTimeout(() => {
      try {
        cardRef.current.classList.remove(`${classes["color-animation"]}`);
      } catch {}
    }, 4000);
  }

  useImperativeHandle(ref, () => {
    return {
      animationActivateGreen: animationActivateGreen,
    };
  });

  return (
    <div ref={cardRef} className={classes[props.type]}>
      {props.children}
    </div>
  );
});

export default WrapperCard;
