import classes from "./CommentSmall.module.css";
import classNames from "classnames";
import Image from "../Image";
import WrapperCard from "../WrapperCard";
import ButtonVote from "../buttons/ButtonVote";
import ButtonLarge from "../buttons/ButtonLarge";
import ButtonComment from "../buttons/ButtonComment";
import { useEffect, useRef, useState } from "react";
import ModalWarning from "./ModalWarning";

const CommentSmall = (props) => {
  // props: userImg; userName; isU; howLongAgo; voteNum; inputText;

  const textAreaRef = useRef();
  const commentAreaRef = useRef();
  const wrapperRef = useRef();
  const [textAreaHeight, setTextAreaHeight] = useState();
  const [value, setValue] = useState(props.inputText);
  const [editValue, setEditValue] = useState(props.inputText);
  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);

  function onChangeHandler(e) {
    let currentTextAreaHeight = textAreaRef.current.scrollHeight;
    if (currentTextAreaHeight > textAreaHeight + 13) {
      let delta = currentTextAreaHeight - textAreaHeight;
      setTextAreaHeight((prev) => prev + delta);
    }
    setEditValue(e.target.value);
  }

  function toggleEditMode() {
    if (isEditing && value !== editValue) {
      setUnsavedChanges(true);
      return;
    }
    if (!isEditing) {
      setEditValue(value);
    }
    setIsEditing(!isEditing);
  }

  function toggleReplyMode() {
    props.toggleReply(props.id);
    props.replyTo(props.userNameHero);
    props.setReplyName(props.userName);
    props.setHeroId(props.heroId);
  }

  function onUpdate() {
    setIsEditing(false);
    if (value !== editValue) {
      setValue(editValue);
      wrapperRef.current.animationActivateGreen();
    }
  }

  useEffect(() => {
    if (!isEditing) {
      setTextAreaHeight(commentAreaRef.current.scrollHeight);
    }
  }, [isEditing]);

  function onDeleteComment() {
    setDeleteCommentModal(false);
    props.deleteComment({
      id: props.id,
      isItReply: props.isItReply,
      userNameHero: props.userNameHero,
    });
  }

  function onAbandonEdit() {
    setIsEditing(false);
    setUnsavedChanges(false);
  }

  function onBackToEdit() {
    setIsEditing(true);
    setUnsavedChanges(false);
  }

  return (
    <>
      {deleteCommentModal && (
        <ModalWarning
          title="Delete comment"
          body="Are you sure you want to delete this comment? This will remove the comment and can’t be undone."
          type="deleteModal"
          proceed={onDeleteComment}
          cancel={() => {
            setDeleteCommentModal(false);
          }}
        />
      )}
      {unsavedChanges && (
        <ModalWarning
          title="Unsaved Edition"
          body="Unsaved changes will be lost. Do you want to go back edit your message or abandon edition?"
          type="editModal"
          proceed={onAbandonEdit}
          cancel={onBackToEdit}
        />
      )}
      <div className={classes.wrapper}>
        <WrapperCard ref={wrapperRef} type="comment">
          <div className={classes.main}>
            <div>
              <div className={classes.header}>
                <div>
                  <Image userImg={props.userImg} size="small" />
                  <p className="username">{props.userName}</p>
                </div>
                <div>
                  <div
                    className={classes.pointer}
                    style={props.isU ? {} : { opacity: "0" }}>
                    <p>you</p>
                  </div>
                  <p className={classes["pointer-para"]}>
                    {props.howLongAgo} ago
                  </p>
                </div>
              </div>
              {!isEditing && (
                <div ref={commentAreaRef} className={classes["comment-area"]}>
                  <p>
                    <span className={classes["reply-name"]}>
                      {props.replyName}
                    </span>
                    {value}
                  </p>
                </div>
              )}
              {isEditing && (
                <textarea
                  ref={textAreaRef}
                  style={{ height: `${textAreaHeight}px` }}
                  onChange={onChangeHandler}
                  name="addNewMess"
                  value={editValue}
                  className={classNames(classes["text-area"])}></textarea>
              )}
            </div>
            <div>
              <ButtonVote voteNum={props.voteNum} isU={props.isU} />
              <div className={classes["action-buttons"]}>
                {props.isU && (
                  <ButtonComment
                    type="delete"
                    onClick={() => {
                      setDeleteCommentModal(true);
                    }}
                  />
                )}
                {props.isU && (
                  <ButtonComment
                    type="edit"
                    isActive={isEditing}
                    onClick={toggleEditMode}
                  />
                )}
                {!props.isU && (
                  <ButtonComment
                    type="reply"
                    isActive={props.isReplyActive}
                    onClick={toggleReplyMode}
                  />
                )}
              </div>
            </div>
            {isEditing && <ButtonLarge type="update" onClick={onUpdate} />}
          </div>
        </WrapperCard>
      </div>
      <div style={{ width: "100%" }} id={`reply${props.id}`}></div>
    </>
  );
};

export default CommentSmall;
