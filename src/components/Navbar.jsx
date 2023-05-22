import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import LoggedInContext from "./LoggedInContext";
import SearchBar from "./SearchBar";
import SearchContext from "./SearchContext";

const Navbar = () => {
  const { isloggedIn, photoURL, setPhotoURL, currentUser } =
    useContext(LoggedInContext);
  const { setSelectedOption, selectedOption } = useContext(SearchContext);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      <div className="navbar">
        <NavLink to="/home">
          {({ isActive }) => (
            <span className={isActive ? "active-menu" : "menu-link-item"}>Home</span>
          )}
        </NavLink>

        {isloggedIn && (
          <>
            <NavLink to="/profile">
              {({ isActive }) => (
                <span className={isActive ? "active-menu" : "menu-link-item"}>
                  Profile
                </span>
              )}
            </NavLink>
            <NavLink to="/liked">
              {({ isActive }) => (
                <span className={isActive ? "active-menu" : "menu-link-item"}>
                  Liked Tweets
                </span>
              )}
            </NavLink>
          </>
        )}

        <NavLink to="/">
          {({ isActive }) => (
            <>
              <span className={isActive ? "active-menu" : "menu-link-item"}>
                {!isloggedIn ? "Login" : "Logout"}
              </span>
            </>
          )}
        </NavLink>
        {isloggedIn && (
          <>
            <SearchBar />
            <p>
              <select
                className="select-dropdown"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="tweets">Tweets</option>
                <option value="user">User</option>
              </select>
            </p>

            <p className="menu-link-item-notlink ">
              Logged in as: <strong> {currentUser.displayName}</strong>
            </p>
            <img className="navbar-photo" src={photoURL} alt="user" />
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
