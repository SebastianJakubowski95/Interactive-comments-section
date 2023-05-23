import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./App.module.css";
import AddNewMess from "./components/UI/AddNewMess";
import Image from "./components/Image";
import userAmyRobson from "./assets/avatars/image-amyrobson.png";
import userMaxBlagun from "./assets/avatars/image-maxblagun.png";
import userRamsesMiron from "./assets/avatars/image-ramsesmiron.png";
import userJuliusOmo from "./assets/avatars/image-juliusomo.png";
import CommentSetLarge from "./components/UI/CommentSetLarge";
import CommentSetSmall from "./components/UI/CommentSetSmall";

const users = [
  {
    userName: "amyrobson",
    userImg: userAmyRobson,
  },
  {
    userName: "maxblagun",
    userImg: userMaxBlagun,
  },
  {
    userName: "ramsesmiron",
    userImg: userRamsesMiron,
  },
  {
    userName: "juliusomo",
    userImg: userJuliusOmo,
  },
];
const initialDataBaseArr = [
  {
    heroCommentData: {
      userName: "amyrobson",
      userImg: userAmyRobson,
      howLongAgo: "1 month",
      textBody:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      id: Math.random(),
      voteNum: 12,
      heroName: "amyrobson",
    },
    replysArr: [],
  },
  {
    heroCommentData: {
      userName: "maxblagun",
      userImg: userMaxBlagun,
      howLongAgo: "2 weeks",
      textBody:
        "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React?  Thanks!",
      id: Math.random(),
      voteNum: 5,
      heroName: "maxblagun",
    },
    replysArr: [
      {
        userName: "ramsesmiron",
        userImg: userRamsesMiron,
        howLongAgo: "1 week",
        replyName: "@maxblagun ",
        textBody:
          "If you’re still new. I’d recommend focusing on the fundamentals of HTML, CSS and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
        id: Math.random(),
        voteNum: 5,
      },
      {
        userName: "juliusomo",
        userImg: userJuliusOmo,
        howLongAgo: "2 days",
        replyName: "@ramsesmiron ",
        textBody:
          " I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        id: Math.random(),
        voteNum: 2,
      },
    ],
  },
];

function App() {
  let w = window.innerWidth;
  const initialUserName = users.filter(
    (user) => user.userName === "juliusomo"
  )[0].userName;

  const [dataBase, setDataBase] = useState(initialDataBaseArr);
  const [activeUser, setActiveUser] = useState(initialUserName);
  const [isReplying, setIsReplying] = useState(false);
  const [replyName, setReplyName] = useState();
  const [replyIndex, setReplyIndex] = useState();
  const [heroId, setHeroId] = useState();
  const [replyValue, setReplyValue] = useState("");
  const [userNameHero, setUserNameHero] = useState();
  const addNewPostRef = useRef();

  const activeUserImg = users.filter((user) => user.userName === activeUser)[0]
    .userImg;

  function toggleReply(id) {
    if (replyIndex == id) {
      onCloseReplyBox();
      return;
    }
    setReplyIndex(id);
    setIsReplying(true);
  }

  function onCloseReplyBox() {
    setIsReplying(false);
    setReplyIndex(null);
  }

  function onSubmitNewPost(heroName) {
    const userData = users.filter((user) => user.userName === activeUser)[0];
    const newPost = {
      heroCommentData: {
        userName: userData.userName,
        userImg: userData.userImg,
        howLongAgo: "1 minute",
        textBody: replyValue,
        id: Math.random(),
        voteNum: 0,
        heroName: heroName,
      },
      replysArr: [],
    };
    setDataBase((prev) => [...prev, newPost]);
    addNewPostRef.current.clear();
  }

  function onDeleteComment(obj) {
    if (obj.isItReply === true) {
      setDataBase((oldDataBase) => {
        const properHeroComment = oldDataBase.filter(
          (comment) => comment.heroCommentData.userName === obj.userNameHero
        )[0];
        const newArr = properHeroComment.replysArr.filter(
          (comment) => comment.id !== obj.id
        );
        const newDataBase = oldDataBase.map((heroComment) => {
          let newHeroComment = { ...heroComment };
          if (heroComment.heroCommentData.userName === obj.userNameHero) {
            newHeroComment = {
              heroCommentData: { ...heroComment.heroCommentData },
              replysArr: newArr,
            };
          }
          return newHeroComment;
        });
        return newDataBase;
      });
    } else if (obj.isItReply === false) {
      setDataBase((old) =>
        old.filter((comment) => comment.heroCommentData.id !== obj.id)
      );
    }
  }

  function onSubmitReply(newComment) {
    console.log(heroId);

    if (replyValue.trim().length > 0) {
      const obj = dataBase.filter(
        (item) => item.heroCommentData.id === heroId
      )[0];
      const newArr = [...obj.replysArr, newComment];
      setDataBase((prev) => {
        const newDataBase = prev.map((hero) => {
          let newHero = { ...hero };
          if (hero.heroCommentData.id === obj.heroCommentData.id) {
            newHero = {
              heroCommentData: { ...hero.heroCommentData },
              replysArr: newArr,
            };
          }
          return newHero;
        });
        return newDataBase;
      });
    }
    onCloseReplyBox();
  }

  function onUserChange(userName) {
    setActiveUser(userName);
  }

  const newReplyBox = (
    <AddNewMess
      type="reply"
      setReplyValue={(newReplyValue) => {
        setReplyValue(newReplyValue);
      }}
      submitReply={onSubmitReply}
      userName={activeUser}
      userImg={activeUserImg}
      minHeight={[40, 60]}
      replyName={replyName}
    />
  );

  const listOfHeroCommentsLarge = dataBase.map((heroComment, index) => {
    const userName = heroComment.heroCommentData.userName;
    return (
      <li key={`commentSetLarge${index}`}>
        <CommentSetLarge
          heroCommentData={heroComment.heroCommentData}
          replysArr={heroComment.replysArr}
          replyIndex={replyIndex}
          toggleReply={toggleReply}
          isU={userName === activeUser}
          activeUser={activeUser}
          userNameHero={userName}
          replyTo={(newReplyTo) => setUserNameHero(newReplyTo)}
          setReplyName={(name) => setReplyName(name)}
          deleteComment={onDeleteComment}
          setHeroId={(heroId) => setHeroId(heroId)}
        />
      </li>
    );
  });

  const listOfHeroCommentsSmall = dataBase.map((heroComment, index) => {
    const userName = heroComment.heroCommentData.userName;
    return (
      <li key={`commentSetLarge${index}`}>
        <CommentSetSmall
          heroCommentData={heroComment.heroCommentData}
          replysArr={heroComment.replysArr}
          replyIndex={replyIndex}
          toggleReply={toggleReply}
          isU={userName === activeUser}
          activeUser={activeUser}
          userNameHero={userName}
          replyTo={(newReplyTo) => setUserNameHero(newReplyTo)}
          setReplyName={(name) => setReplyName(name)}
          deleteComment={onDeleteComment}
          setHeroId={(heroId) => setHeroId(heroId)}
        />
      </li>
    );
  });

  const changeUserList = users.map((user, index) => (
    <li key={`changeUserList${index}`}>
      <button onClick={() => onUserChange(user.userName)}>
        <Image
          userImg={user.userImg}
          size="large"
          isU={user.userName === activeUser}
        />
      </button>
    </li>
  ));

  return (
    <>
      <div className={classes["main-list"]}>
        <ul className={classes.users}>{changeUserList}</ul>
        <ul>{w >= 768 ? listOfHeroCommentsLarge : listOfHeroCommentsSmall}</ul>
        <AddNewMess
          ref={addNewPostRef}
          type="send"
          setReplyValue={(newReplyValue) => {
            setReplyValue(newReplyValue);
          }}
          submitNewPost={onSubmitNewPost}
          userImg={activeUserImg}
          minHeight={[40, 60]}
        />
      </div>
      {isReplying &&
        createPortal(
          newReplyBox,
          document.getElementById(`reply${replyIndex}`)
        )}
    </>
  );
}

export default App;
