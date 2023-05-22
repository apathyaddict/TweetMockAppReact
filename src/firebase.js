import React, { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from "firebase/auth"
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGRBq6w9i4vkt3krcut3ftfakzdj2m5IA",
  authDomain: "micro-blog-f57a3.firebaseapp.com",
  projectId: "micro-blog-f57a3",
  storageBucket: "micro-blog-f57a3.appspot.com",
  messagingSenderId: "505184970419",
  appId: "1:505184970419:web:7cfbbed582e12fb87872c6",
  measurementId: "G-PCLKCXRDPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(app);




//storage function

const upload = async (file, currentUser, setLoading) =>{
  const fileRef = ref(storage, currentUser.uid + "png");

  const snapshot= await uploadBytes(fileRef, file);

  const photoURL= await getDownloadURL(fileRef)

  updateProfile(currentUser,{photoURL: photoURL})

  alert("Picture uploaded")
}

//sign in with google

const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    // const userName = result.user.displayName; 
    // const email = result.user.email;
    // const photoURL = result.user.photoURL;

  }).catch((error) => {
    console.error(error)
  }) 
}
//custom hook
function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
   const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
  return unsub;
  }, []);
  return currentUser;
}

export { auth, db, upload, signInWithGoogle, useAuth };


 
