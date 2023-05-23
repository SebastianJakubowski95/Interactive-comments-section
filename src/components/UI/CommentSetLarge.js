import classes from "./CommentSetLarge.module.css";
import WrapperCard from "../WrapperCard";
import CommentLarge from "./CommentLarge";
import Hr from "../Hr";

const CommentSetLarge = (props) => {
  const replysArr = props.replysArr;
  const listOfReplys = replysArr.map((reply, index) => {
    const userName = reply.userName;
    return (
      <li key={`commentLarge${index}`}>
        <CommentLarge
          voteNum={reply.voteNum}
          userImg={reply.userImg}
          userName={reply.userName}
          howLongAgo={reply.howLongAgo}
          isU={userName === props.activeUser}
          inputText={reply.textBody}
          id={reply.id}
          heroId={props.heroCommentData.id}
          toggleReply={props.toggleReply}
          isReplyActive={props.replyIndex == reply.id}
          isItReply={true}
          userNameHero={props.userNameHero}
          replyTo={props.replyTo}
          setReplyName={props.setReplyName}
          replyName={reply.replyName}
          deleteComment={props.deleteComment}
          setHeroId={props.setHeroId}
        />
      </li>
    );
  });

  return (
    <>
      <WrapperCard type="comment-set">
        <div className={classes["comment-set"]}>
          <CommentLarge
            voteNum={props.heroCommentData.voteNum}
            userImg={props.heroCommentData.userImg}
            userName={props.heroCommentData.userName}
            howLongAgo={props.heroCommentData.howLongAgo}
            isU={props.isU}
            inputText={props.heroCommentData.textBody}
            id={props.heroCommentData.id}
            heroId={props.heroCommentData.id}
            toggleReply={props.toggleReply}
            isReplyActive={props.replyIndex == props.heroCommentData.id}
            isItReply={false}
            userNameHero={props.userNameHero}
            replyTo={props.replyTo}
            setReplyName={props.setReplyName}
            deleteComment={props.deleteComment}
            setHeroId={props.setHeroId}
          />
          <div className={classes["replys-section"]}>
            <Hr />
            <div>
              <ul>{listOfReplys}</ul>
            </div>
          </div>
        </div>
      </WrapperCard>
    </>
  );
};

export default CommentSetLarge;
