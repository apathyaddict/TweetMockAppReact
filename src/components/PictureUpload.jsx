import React, {useContext, useEffect, useState} from 'react'
import LoggedInContext from './LoggedInContext'
import { upload } from "../firebase";

const PictureUpload = () => {
    const { currentUser, photoURL, setPhotoURL } = useContext(LoggedInContext);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    
const handleUpload = (e) => {
    if(e.target.files[0]){
        setPhoto(e.target.files[0]);
    }
}

const submitUpload = async () => {
  setLoading(true);
  const url = await upload(photo, currentUser);
  setPhotoURL(url);
  setLoading(false);
};

useEffect (() =>{
    if (currentUser?.photoURL) {
    setPhotoURL(currentUser.photoURL)
    }
},[currentUser]);



  return (
    <div className="main-div-profile">
    <div className="second-div-profile">
      <div>
        <div className="user-name-text">
          <p>Profile picture :</p>
        </div>
        <div className='div-photo-profile'>
        <img src ={photoURL} alt="profile " className='profile-pic'/>
      
          <input
            className="user-name-input"
            placeholder="..."
            type="file"
            id="browse-input"
            onChange={handleUpload}
          />
           </div>
        <div className="btn-div">
          <button disabled={loading || !photo} className="btn-save-username" onClick={submitUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PictureUpload