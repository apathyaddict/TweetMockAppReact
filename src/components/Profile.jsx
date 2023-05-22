import React, { useState, useEffect, useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import { getAuth, updateProfile } from "firebase/auth";
import {
  where,
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const [savedUserName, setSavedUserName] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { currentUser } = useContext(LoggedInContext);

  const handleUserName = (event) => {
    setSavedUserName(event.target.value);
  };

  const handleSaveUserName = (event) => {
    event.preventDefault();
    if (savedUserName.length > 0) {
      localStorage.setItem("User Name", JSON.stringify(savedUserName));
      setIsAdded(true);

      try {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: savedUserName,
        });
      } catch (error) {
        console.log(error.message);
      }

      updateProfileName();
    }
  };

  const updateProfileName = async () => {
    const idSpecificArray = [];
    const q = query(
      collection(db, "tweets"),
      where("userId", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idSpecificArray.push(doc.id);
      console.log(idSpecificArray);
    });
    for (let i = 0; i < idSpecificArray.length; i++) {
      const docRef = doc(db, "tweets", idSpecificArray[i]);

      await updateDoc(docRef, {
        userName: savedUserName,
        photoURL: currentUser.photoURL,
      });
    }
  };

  useEffect(() => {
    if (isAdded) {
      const timeoutId = setTimeout(() => {
        setIsAdded(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isAdded]);

  return (
    <div className="main-div-profile">
      <div className="second-div-profile">
        <h1 className="title-profile">Profile</h1>
        <div>
          <div className="user-name-text">
            <p>User Name :</p>
          </div>
          <div>
            <input
              className="user-name-input"
              placeholder={currentUser.displayName}
              type="text"
              value={savedUserName}
              onChange={handleUserName}
            />
          </div>
          <div className="btn-div">
            <button className="btn-save-username" onClick={handleSaveUserName}>
              {isAdded ? "Added!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
