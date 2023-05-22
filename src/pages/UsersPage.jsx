import React from "react";
import { useParams, useLocation } from "react-router-dom";

const UsersPage = () => {
  const { id } = useParams();

  const location = useLocation();
  const tweet = location.state;

  const photoURL = tweet.photoURL
    ? tweet.photoURL
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

  return (
    <>
      <div className="div-container-form">
        <div className="div-container-userpage">
          <h3 className="userpage-name"> {tweet.userName}</h3>
          <img src={photoURL} alt="profile " className="userpage-profile-pic" />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
