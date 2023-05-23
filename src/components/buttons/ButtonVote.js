import classes from "./ButtonVote.module.css";
import plusIcon from "../../assets/icon-plus.svg";
import minusIcon from "../../assets/icon-minus.svg";
import { useState, useRef } from "react";

const ButtonVote = (props) => {
  // props: voteNum; isU;
  const [num, setNum] = useState(props.voteNum);
  const [plusPressed, setPlusPressed] = useState(false);
  const [minusPressed, setMinusPressed] = useState(false);
  const paraRef = useRef();
  const buttonPlusRef = useRef();
  const buttonMinusRef = useRef();

  function onIncrease() {
    if (props.isU) {
      return;
    }
    if (plusPressed === false && minusPressed === false) {
      setNum((num) => num + 1);
      setPlusPressed(true);
      buttonPlusRef.current.classList.add(`${classes["voted-button"]}`);
      paraAnimation();
    } else if (plusPressed === false && minusPressed === true) {
      setNum((num) => num + 2);
      setPlusPressed(true);
      setMinusPressed(false);
      buttonPlusRef.current.classList.add(`${classes["voted-button"]}`);
      buttonMinusRef.current.classList.remove(`${classes["voted-button"]}`);
      paraAnimation();
    } else if (plusPressed === true) {
      setNum((num) => num - 1);
      setPlusPressed(false);
      buttonPlusRef.current.classList.remove(`${classes["voted-button"]}`);
      paraAnimation();
    }
  }

  function onDecrease() {
    if (props.isU) {
      return;
    }
    if (minusPressed === false && plusPressed === false) {
      setNum((num) => num - 1);
      setMinusPressed(true);
      buttonMinusRef.current.classList.add(`${classes["voted-button"]}`);
      paraAnimation();
    } else if (minusPressed === false && plusPressed === true) {
      setNum((num) => num - 2);
      setMinusPressed(true);
      setPlusPressed(false);
      buttonMinusRef.current.classList.add(`${classes["voted-button"]}`);
      buttonPlusRef.current.classList.remove(`${classes["voted-button"]}`);
      paraAnimation();
    } else if (minusPressed === true) {
      setNum((num) => num + 1);
      setMinusPressed(false);
      buttonMinusRef.current.classList.remove(`${classes["voted-button"]}`);
      paraAnimation();
    }
  }

  function paraAnimation() {
    paraRef.current.classList.add(`${classes["voted-para"]}`);
    setTimeout(() => {
      paraRef.current.classList.remove(`${classes["voted-para"]}`);
    }, 300);
  }

  return (
    <div className={classes.main}>
      <button ref={buttonPlusRef} onClick={onIncrease}>
        <img src={plusIcon} alt="+" />
      </button>
      <p ref={paraRef} className="username">
        {num}
      </p>
      <button ref={buttonMinusRef} onClick={onDecrease}>
        <img src={minusIcon} alt="-" />
      </button>
    </div>
  );
};

export default ButtonVote;
