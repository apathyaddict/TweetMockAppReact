import React, { useState, useContext, useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoggedInContext from "./LoggedInContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const LikeButton = ({ tweet }) => {
  const [isActive, setIsActive] = useState(false);
  const { currentUser } = useContext(LoggedInContext);

  useEffect(() => {
    if (currentUser && tweet.liked && tweet.liked[currentUser.uid]) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentUser, tweet]);

  const changeHeart = (e) => {
    setIsActive(!isActive);
    handleLike(tweet.id);
  };

  const handleLike = async (tweetId) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetDoc = await getDoc(tweetRef);
    const tweetData = tweetDoc.data();

    if (isActive) {
      const updatedLiked = { ...tweetData.liked };
      delete updatedLiked[currentUser.uid];
      await updateDoc(tweetRef, { liked: updatedLiked });
    } else {
      await updateDoc(tweetRef, {
        liked: {
          ...tweetData.liked,
          [currentUser.uid]: true,
        },
      });
    }
  };

  return (
    <div className="li-top-row">
      <div>
        <button
          className={`btn-like ${isActive ? "active" : ""}`}
          onClick={changeHeart}
        >
          {!isActive ? "Like" : "Liked"}
          <FontAwesomeIcon
            icon={faHeart}
            aria-hidden="true"
            className={isActive ? "active" : ""}
            id="heartSVG"
          />
        </button>
      </div>
    </div>
  );
};

export default LikeButton;
