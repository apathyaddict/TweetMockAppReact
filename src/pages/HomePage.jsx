import React, { useContext, useState, useEffect } from "react";
import Form from "../components/Form";
import Filter from "../components/Filter";
import TweetList from "../components/TweetList";
import TweetContext from "../components/TweetContext";
import LoggedInContext from "../components/LoggedInContext";

const HomePage = ({ searchQuery }) => {
  const { allTweets, setAllTweets } = useContext(TweetContext);
  const { isloggedIn } = useContext(LoggedInContext);

  const [filtered, setFiltered] = useState([]);
  const [activeTweets, setActiveTweets] = useState("");

  const addTweets = (newTweet) => {
    if (!allTweets.some((tweet) => tweet.id === newTweet.id)) {
      setAllTweets([newTweet, ...allTweets]);
    }
  };



  return (
    <div>
      {isloggedIn ? (
        <>
          <div className="form">
            <Form {...{ addTweets, allTweets, setAllTweets, setFiltered }} />
          </div>
          <Filter
            {...{
              allTweets,
              setFiltered,
              activeTweets,
              setActiveTweets,
              filtered,
            }}
          />
          <TweetList {...{ allTweets, activeTweets, filtered }} />
        </>
      ) : (
        <div className="login-warning-main">Please login to see tweets</div>
      )}
    </div>
  );
};

export default HomePage;
