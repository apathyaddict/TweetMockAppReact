import React, { useState, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TweetContext from "./TweetContext";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { db, useAuth } from "../firebase";
import SearchContext from "./SearchContext";

const Form = ({ addTweets, setAllTweets, allTweets, setFiltered }) => {
  const { tweet, setTweet } = useContext(TweetContext);
  const { searchQuery, selectedOption, setSearchedTweets } =
    useContext(SearchContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const currentUser = useAuth();

  const tweetRef = collection(db, "tweets");

  const handleTweet = (event) => {
    setTweet(event.target.value);
  };

  useEffect(() => {
    if (tweet.length > 140) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [tweet]);

  const getUserName = async () => {
    if (currentUser) {
      setUserName(currentUser.displayName);
    } else {
      setUserName("Anonymous");
    }
  };

  useEffect(() => {
    getUserName();
  }, [userName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTweet = {
      content: tweet,
      userName: userName,
      date: new Date().toISOString(),
      userId: currentUser.uid,
      photoURL: currentUser.photoURL,
      liked: {},
    };

    try {
      setLoading(true);
      await addDoc(collection(db, "tweets"), newTweet);
      setLoading(false);
      addTweets(newTweet);
      setTweet("");
    } catch (error) {
      console.log(error);
    }
  };

  const getTweets = async () => {
    try {
      const searchedTweetsArray = allTweets.filter((tweet) => {
        if (searchQuery === "") {
          return true;
        } else if (
          selectedOption === "tweets" &&
          tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return true;
        } else if (
          selectedOption === "user" &&
          tweet.userName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setSearchedTweets(searchedTweetsArray);
    } catch (error) {
      alert("Error", error);
      console.log(error);
    }
  };

  useEffect(() => {
    return () => getTweets();
  }, [searchQuery]);

  useEffect(() => {
    const sortDate = onSnapshot(
      query(collection(db, "tweets"), orderBy("date", "desc")),
      (snapshot) => {
        setAllTweets(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setFiltered(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );

    return () => sortDate();
  }, []);



  return (
    <>
      <form className="div-container-form">
        <TextareaAutosize
          value={tweet}
          id="textarea"
          placeholder="Tweet Tweet..."
          minRows={6}
          onChange={handleTweet}
          maxLength={141}
        />
        <div className="div-bottom-form">
          <span
            className="character-warning"
            style={{ display: tweet.length > 140 ? "block" : "none" }}
          >
            The tweet can't contain more than 140 characters
          </span>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn-tweet"
            disabled={isButtonDisabled}
          >
            {loading ? <>Loading..</> : <>Tweet</>}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
