import React, { useContext } from "react";
import Tweet from "./Tweet";
import LoggedInContext from "./LoggedInContext";
import SearchContext from "./SearchContext";

const TweetList = ({ filtered, activeTweets, sortedTweets }) => {
  const { currentUser } = useContext(LoggedInContext);
  const { searchQuery, searchedTweets } = useContext(SearchContext);

  return (
    <div className="div-container-tweets">
      {!searchQuery ? (
        <ul>
          {currentUser &&
            filtered
              .flat()
              .map((tweet) => (
                <Tweet
                  key={tweet.id}
                  tweet={tweet}
                  activeTweets={activeTweets}
                />
              ))}
        </ul>
      ) : (
        <ul>
          {searchQuery &&
            searchedTweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} activeTweets={activeTweets} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default TweetList;
