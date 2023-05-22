import React, { useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";

const Tweet = ({ tweet, activeTweets }) => {
  const { currentUser } = useContext(LoggedInContext);

  return (
    <li
      key={tweet.id}
      className={activeTweets === currentUser.uid ? "mytweets-li" : ""}
    >
      <div className="tweet-left">
        <div className="profile-pic-div">
          <img
            src={
              tweet.photoURL
                ? tweet.photoURL
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
            }
            alt="profile "
            className="profile-pic-tweet"
          />
        </div>
        <div className="li-middle-row">
          <div className="li-top-row">
            <div>
            <Link 
            to={{ 
                pathname: `/UsersPage/${tweet.userId}`}} 
                state = { tweet } 
                className="li-top-row link"
             >
                {tweet.userName}
                </Link>
            </div>
            <div>{tweet.date}</div>
          </div>
          <div className="li-bottom-row">
            <p className={activeTweets === currentUser.uid ? "mytweets-p" : ""}>
              {tweet.content}
            </p>
          </div>
        </div>
      </div>
      <LikeButton tweet={tweet} />
    </li>
  );
};

export default Tweet;
