import { createContext, useState } from "react";

const LoggedInContext = createContext();

export function LoggedInProvider({ children }) {

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('loggedIn') || '')
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png");


  return (
    <LoggedInContext.Provider value={{ isloggedIn, setIsLoggedIn, currentUser, setCurrentUser, photoURL, setPhotoURL }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
