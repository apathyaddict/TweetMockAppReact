import React, { useState, useContext, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, db } from "../firebase";
import LoggedInContext from "./LoggedInContext";

const SignIn = () => {
  //TODO:logs out on reload
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isloggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(LoggedInContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      navigate("/home");
      const user = userCredential.user;

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          authProvider: "local",
          email: user.email,
        });
      }

      localStorage.setItem('loggedIn', user.uid);

      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
    } catch (error) {
      navigate("/");
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        setIsLoggedIn(false);
        console.log("Signed out successfully");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleRegister = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });

      navigate("/home");
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterPage = (event) => {
    setIsRegistered((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isRegistered) {
      navigate("/register");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="main-container-login">
      <div className="big-box-login">
        <div></div>
        <form>
          <div>
            {!isloggedIn ? (
              <input
                type="text"
                className="input-login"
                id="username"
                placeholder="Username"
                value={email}
                onChange={handleEmail}
              />
            ) : null}
          </div>
          <div className="spacer"></div>
          <div>
            {!isloggedIn ? (
              <input
                type="password"
                className="input-login"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            ) : null}
          </div>
        </form>
        <div>
          {!isRegistered ? (
            <button
              className="btn-login"
              onClick={isloggedIn ? handleLogout : handleLoginSubmit}
            >
              {" "}
              {!isloggedIn ? "Login" : "Logout"}
            </button>
          ) : (
            <button className="btn-login" onClick={handleRegister}>
              Register
            </button>
          )}
        </div>
        {!isloggedIn && (
          <button className="btn-google" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        )}
        <div>
          {!isloggedIn ? (
            <p className="signup-text">
              {isRegistered ? "Already Registered?" : "Don't have an account?"}
              <button className="btn-register" onClick={handleRegisterPage}>
                {isRegistered ? " Log In" : " Register"}
              </button>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
