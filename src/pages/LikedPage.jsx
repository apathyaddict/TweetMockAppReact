import React, { useContext, useEffect, useState } from "react";
import LoggedInContext from "../components/LoggedInContext";
import { db } from "../firebase";
import { doc, getDocs, where, collection, query } from "firebase/firestore";
import Tweet from "../components/Tweet";

const LikedPage = () => {
  const { currentUser } = useContext(LoggedInContext);
  const [likedTweets, setLikedTweets] = useState([]);

  useEffect(() => {
    handleLike();
    return () => {
      console.log("Component unmounted");
    };
  }, [currentUser]);

  const handleLike = async () => {
    try {
      const likeTweetsArray = [];
      const q = query(
        collection(db, "tweets"),
        where("liked." + currentUser.uid, "==", true)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        likeTweetsArray.push(doc.data());
      });

      setLikedTweets(likeTweetsArray);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="div-container-tweets">
      <ul>
        {likedTweets.flat().map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
};

export default LikedPage;
