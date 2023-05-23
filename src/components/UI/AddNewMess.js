import classes from "./AddNewMess.module.css";
import ButtonLarge from "../buttons/ButtonLarge";
import Image from "../Image";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";

const AddNewMess = forwardRef((props, ref) => {
  let w = window.innerWidth;
  let minHeight;
  if (w <= 768) {
    minHeight = props.minHeight[1];
  } else if (w > 768) {
    minHeight = props.minHeight[0];
  }
  const [textAreaHeight, setTextAreaHeight] = useState(minHeight);
  const [value, setValue] = useState("");
  const textAreaRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      clear: () => {
        setValue("");
        setTextAreaHeight(minHeight);
      },
    };
  });

  function onSubmitForm(e) {
    e.preventDefault();
    if (props.type === "reply") {
      let newComment = {
        userName: props.userName,
        userImg: props.userImg,
        replyName: `@${props.replyName} `,
        howLongAgo: "1 minute",
        textBody: value,
        id: Math.random(),
        voteNum: 0,
      };
      props.submitReply(newComment);
    } else if (props.type === "send") {
      props.submitNewPost(props.userName);
    }
  }

  function onChangeHandler(e) {
    let currentTextAreaHeight = textAreaRef.current.scrollHeight;
    if (currentTextAreaHeight > textAreaHeight + 13) {
      let delta = currentTextAreaHeight - textAreaHeight;
      setTextAreaHeight((prev) => prev + delta);
    }
    setValue(e.target.value);
    props.setReplyValue(e.target.value);
  }

  if (w > 768) {
    return (
      <form onSubmit={onSubmitForm} className={classes["main-large"]}>
        <Image userImg={props.userImg} size="large" />
        <textarea
          ref={textAreaRef}
          style={{ height: `${textAreaHeight}px` }}
          onChange={onChangeHandler}
          name="addNewMess"
          value={value}
          placeholder="Start typing ..."
          className={classes["text-area"]}></textarea>
        <ButtonLarge type={props.type} />
      </form>
    );
  } else if (w <= 768) {
    return (
      <form onSubmit={onSubmitForm} className={classes["main-small"]}>
        <textarea
          ref={textAreaRef}
          style={{ height: `${textAreaHeight}px` }}
          onChange={onChangeHandler}
          name="addNewMess"
          value={value}
          placeholder="Start typing ..."
          className={classes["text-area"]}></textarea>
        <div>
          <Image userImg={props.userImg} size="small" />
          <ButtonLarge type={props.type} />
        </div>
      </form>
    );
  }
});

export default AddNewMess;
