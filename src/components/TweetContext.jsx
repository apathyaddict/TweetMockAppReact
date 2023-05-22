import { createContext, useState } from "react";

const TweetContext = createContext();

export function TweetProvider({ children }) {
  const [allTweets, setAllTweets] = useState([]);

  const [tweet, setTweet] = useState("");

  return (
    <TweetContext.Provider value={{ allTweets, setAllTweets, tweet, setTweet }}>
      {children}
    </TweetContext.Provider>
  );
}

export default TweetContext;
