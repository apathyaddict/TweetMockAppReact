import React, { useContext, useState } from "react";
import Profile from "../components/Profile";
import PictureUpload from "../components/PictureUpload";
import LoggedInContext from "../components/LoggedInContext";
import { getAuth, updatePassword } from "firebase/auth";

const ProfilePage = () => {
  const { isloggedIn, currentUser } = useContext(LoggedInContext);
  const auth = getAuth();

  const [newPassword, setNewPassword] = useState("");
  const user = auth.currentUser;

  const handleUpdatePassword = (e) => {
    setNewPassword(e.target.value);

  }

  const handlePasswordChange = async () => {
   const password = await updatePassword(user, newPassword)
     try{
        alert("Password updated successfully!");
      }catch (error) {
        console.log(error.message);
        alert(error.message);
   }
  }

  return (
    <div>
      {isloggedIn ? (
        <>
          <Profile />
          <PictureUpload />

          <div className="main-div-left">
            <div className="user-name-text">
              <p>Change Password:</p>
            </div>

            <input
              className="user-name-input"
              placeholder="new password"
              type="text"
              value={newPassword}
              onChange={handleUpdatePassword}
            />
            
          
          <div className="btn-div">
          <button className="btn-save-username" 
          
          onClick={handlePasswordChange}>
            Change 
            </button>
            </div>
            </div>
        </>
      ) : (
        <div className="login-warning-main">Please login to see profile</div>
      )}
    </div>
  );
};

export default ProfilePage;
