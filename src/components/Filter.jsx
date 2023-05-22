import React, { useEffect, useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import SearchContext from "./SearchContext";

const Filter = ({
  setActiveTweets,
  activeTweets,
  setFiltered,
  filtered,
  allTweets,
}) => {
  const { currentUser } = React.useContext(LoggedInContext);
  const { searchQuery, searchedTweets } = useContext(SearchContext);

  useEffect(() => {
    if (activeTweets === "") {
      setFiltered(allTweets);
      return;
    }
    const filtered = allTweets.filter(
      (tweet) => tweet.userId === currentUser.uid
    );
    return setFiltered(filtered);
  }, [activeTweets]);

  return (
    <div className="btn-filter-div">
      <button
        className={"btn-filter" + (activeTweets === "" ? " active" : "")}
        onClick={() => setActiveTweets("")}
      >
        All Tweets
      </button>

      <button
        className={
          "btn-filter" + (activeTweets === currentUser.uid ? " active" : "")
        }
        disabled={searchQuery}
        onClick={() => setActiveTweets(currentUser.uid)}
      >
        My Tweets
      </button>
    </div>
  );
};

export default Filter;
